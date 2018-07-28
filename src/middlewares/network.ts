import { Socket } from "net";
import { Middleware, Dispatch, Store } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  receiveRawMessages,
  setConnectionFailed,
  lookup,
  SendRawMessageAction,
  SEND_RAW_MESSAGE,
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

type NetworkMiddlewareAction =
  | ConnectServerAction
  | DisconnectServerAction
  | SendRawMessageAction;

/**
 * Network Middleware
 *
 * Manage connections and data sending/receiving to/from the servers.
 */
export const network: Middleware = (store: Store<AppState>) => next => (
  action: NetworkMiddlewareAction,
) => {
  next(action);

  if (handlers.hasOwnProperty(action.type)) {
    handlers[action.type](action, store);
  }
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

type Handler<A = NetworkMiddlewareAction> = (
  action: A,
  store: Store<AppState>,
) => void;

const connect: Handler<ConnectServerAction> = (
  { payload: { host, port, newConnection }, route },
  store,
) => {
  const serverKey = newConnection
    ? generateServerKey(store.getState().servers)
    : route.serverKey;

  if (connections.hasOwnProperty(serverKey) && connections[serverKey].socket) {
    connections[serverKey].socket.destroy();
  }

  connections[serverKey] = {
    socket: getSocket(store.dispatch)(serverKey),
    buffer: "",
  };

  connections[serverKey].socket.connect({ host, port });
};

const disconnect: Handler<DisconnectServerAction> = (action, { dispatch }) => {
  const { payload, route } = action;

  if (!connections.hasOwnProperty(route.serverKey)) {
    // TODO dispatch error
    console.warn("disconnect: unable to find socket");
    return;
  }

  dispatch(sendQuit(route.serverKey, payload.quitMessage));
  connections[route.serverKey].socket.end();
};

const sendMessage: Handler<SendRawMessageAction> = action => {
  if (!connections.hasOwnProperty(action.serverKey)) {
    // TODO dispatch error
    console.warn("sendMessage: unable to find socket");
    return;
  }

  connections[action.serverKey].socket.write(
    action.payload.raw.slice(
      0,
      action.payload.raw.length > IRC_MESSAGE_LENGTH - CRLF.length
        ? IRC_MESSAGE_LENGTH
        : undefined,
    ) + CRLF,
  );
};

const handlers: { [action: string]: Handler } = {
  [CONNECT_SERVER]: connect,
  [DISCONNECT_SERVER]: disconnect,
  [SEND_RAW_MESSAGE]: sendMessage,
};

const connections: {
  [serverKey: string]: { socket: Socket; buffer: string };
} = {};

const getSocket = (dispatch: Dispatch) => (serverKey: string): Socket => {
  const socket = new Socket();

  socket.on("lookup", (error, address, family, host) => {
    dispatch(lookup(serverKey, error, address, family, host));
  });

  socket.on("connect", () => {
    dispatch(setConnectionEstablished(serverKey));
  });

  socket.on("data", buffer => {
    if (!connections.hasOwnProperty(serverKey)) {
      // TODO dispatch error
      console.warn("receive data: unable to find socket");
      return;
    }

    connections[serverKey].buffer += buffer;
    const messages = connections[serverKey].buffer.split(CRLF);
    connections[serverKey].buffer = messages.pop() || "";

    dispatch(receiveRawMessages(serverKey, messages));
  });

  socket.on("close", hadError => {
    delete connections[serverKey];
    dispatch(setConnectionClosed(serverKey, hadError));
  });

  socket.on("error", ({ name, message, stack }) => {
    delete connections[serverKey];
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
