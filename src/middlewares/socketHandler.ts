import { Socket } from "net";
import { Middleware, Dispatch, Store, Action } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  receiveRawMessages,
  setConnectionFailed,
  lookup,
  SEND_RAW_MESSAGE,
  SendRawMessageAction,
} from "@app/actions/socket";
import { AppState } from "@app/reducers";
import {
  ConnectServerAction,
  DisconnectServerAction,
  CONNECT_SERVER,
  DISCONNECT_SERVER,
} from "@app/actions/socket";
import { CRLF, IRC_MESSAGE_LENGTH } from "@app/helpers";
import { ServersState } from "@app/reducers/servers";
import { sendQuit } from "@app/actions/messages";
import { RoutedAction } from "@app/Route";

/**
 * Socket Middleware
 *
 * Manage connections and data sending/receiving to/from servers.
 */
export const socketHandler: Middleware = (store: Store<AppState>) => next => (
  action: Action,
) => {
  next(action);

  if (handlers.hasOwnProperty(action.type)) {
    handlers[action.type](action, store);
  }
};

const connectedSockets: {
  [serverKey: string]: { socket: Socket; buffer: string };
} = {};

const handlers: {
  [action: string]: (action: Action, store: Store<AppState>) => void;
} = {
  [CONNECT_SERVER]: (
    { payload: { host, port, newConnection }, route }: ConnectServerAction,
    { getState, dispatch }: Store<AppState>,
  ) => {
    const serverKey = newConnection
      ? generateServerKey(getState().servers)
      : route.serverKey;

    if (
      connectedSockets.hasOwnProperty(serverKey) &&
      connectedSockets[serverKey].socket
    ) {
      connectedSockets[serverKey].socket.destroy();
    }

    connectedSockets[serverKey] = {
      socket: getSocket(dispatch)(serverKey),
      buffer: "",
    };

    connectedSockets[serverKey].socket.connect({ host, port });
  },

  [DISCONNECT_SERVER]: (
    { payload, route }: DisconnectServerAction,
    { dispatch }: Store<AppState>,
  ) => {
    if (!connectedSockets.hasOwnProperty(route.serverKey)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn("disconnect: unable to find socket");
      return;
    }

    dispatch(sendQuit(route.serverKey, payload.quitMessage));
    connectedSockets[route.serverKey].socket.end();
  },

  [SEND_RAW_MESSAGE]: (
    {
      payload,
      route: { serverKey },
      embeddedAction,
    }: SendRawMessageAction<RoutedAction>,
    { dispatch }: Store<AppState, RoutedAction>,
  ) => {
    if (!connectedSockets.hasOwnProperty(serverKey)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn("sendMessage: unable to find socket");
      return;
    }

    connectedSockets[serverKey].socket.write(
      payload.raw.slice(
        0,
        payload.raw.length > IRC_MESSAGE_LENGTH - CRLF.length
          ? IRC_MESSAGE_LENGTH
          : undefined,
      ) + CRLF,
    );

    if (embeddedAction !== undefined) {
      dispatch(embeddedAction);
    }
  },
};

/**
 * Generate server key
 *
 * The returned key will be unique only if servers map are provided.
 */
export const generateServerKey = (servers?: ServersState): string => {
  const key = Math.random()
    .toString(36)
    .slice(2);
  return !servers || !servers.hasOwnProperty(key)
    ? key
    : generateServerKey(servers);
};

/**
 * Get a new socket
 *
 * Create a TCP socket and add listeners that dispatches actions.
 */
const getSocket = (dispatch: Dispatch) => (serverKey: string): Socket => {
  const socket = new Socket();

  socket.on("lookup", (error, address, family, host) => {
    dispatch(lookup(serverKey, error, address, family, host));
  });

  socket.on("connect", () => {
    dispatch(setConnectionEstablished(serverKey));
  });

  socket.on("data", buffer => {
    if (!connectedSockets.hasOwnProperty(serverKey)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn("receive data: unable to find socket");
      return;
    }

    connectedSockets[serverKey].buffer += buffer;
    const messages = connectedSockets[serverKey].buffer.split(CRLF);
    connectedSockets[serverKey].buffer = messages.pop() || "";

    dispatch(receiveRawMessages(serverKey, messages));
  });

  socket.on("close", hadError => {
    delete connectedSockets[serverKey];
    dispatch(setConnectionClosed(serverKey, hadError));
  });

  socket.on("error", ({ name, message, stack }) => {
    delete connectedSockets[serverKey];
    dispatch(setConnectionFailed(serverKey, name, message, stack));
  });

  socket.on("end", () => {
    // tslint:disable-next-line
    console.warn("unhandled socket end");
  });

  socket.on("timeout", () => {
    // tslint:disable-next-line
    console.warn("unhandled socket timeout");
  });

  return socket;
};
