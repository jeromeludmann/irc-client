import { Socket } from "net";
import { Middleware, Dispatch } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  receiveRawMessages,
  setConnectionFailed,
  lookup,
} from "@app/actions/network";
import { RootState } from "@app/reducers";
import {
  ConnectServerAction,
  DisconnectServerAction,
  CONNECT_SERVER,
  DISCONNECT_SERVER,
} from "@app/actions/network";
import { OutgoingMessageAction, SEND_MESSAGE } from "@app/actions/outgoing";
import { CRLF, IRC_MESSAGE_LENGTH } from "@app/middlewares/constants";
import { ServersState } from "@app/reducers/servers";

const getSocketDispatcher = (dispatch: Dispatch) => (
  serverKey: string,
): Socket => {
  const socket = new Socket();

  socket.on("lookup", (error, address, family, host) => {
    dispatch(lookup(serverKey, error, address, family, host));
  });

  socket.on("connect", () => {
    dispatch(setConnectionEstablished(serverKey));
  });

  socket.on("data", buffer => {
    serverRegistry[serverKey].buffer += buffer;
    const messages = serverRegistry[serverKey].buffer.split(CRLF);
    serverRegistry[serverKey].buffer = messages.pop() || "";
    dispatch(receiveRawMessages(serverKey, messages));
  });

  socket.on("close", hadError => {
    dispatch(setConnectionClosed(serverKey, hadError));
  });

  socket.on("error", ({ name, message, stack }) => {
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

export const generateServerKey = (servers?: ServersState): string => {
  const key = Math.random()
    .toString(36)
    .slice(2);
  return !servers || !servers.hasOwnProperty(key)
    ? key
    : generateServerKey(servers);
};

const serverRegistry: {
  [serverKey: string]: { socket: Socket; buffer: string };
} = {};

export const network: Middleware<{}, RootState> = store => next => (
  action: OutgoingMessageAction | ConnectServerAction | DisconnectServerAction,
) => {
  next(action);

  switch (action.type) {
    case CONNECT_SERVER:
      const serverKey = generateServerKey(store.getState().servers);

      serverRegistry[serverKey] = {
        socket: getSocketDispatcher(store.dispatch)(serverKey),
        buffer: "",
      };

      serverRegistry[serverKey].socket.connect({
        host: action.payload.host,
        port: action.payload.port,
      });

      break;

    case DISCONNECT_SERVER:
      serverRegistry[action.route.serverKey].socket.end();
      break;

    case SEND_MESSAGE:
      serverRegistry[action.serverKey].socket.write(
        action.payload.raw.slice(
          0,
          action.payload.raw.length > IRC_MESSAGE_LENGTH - CRLF.length
            ? IRC_MESSAGE_LENGTH
            : undefined,
        ) + CRLF,
      );
      break;
  }
};
