import { Socket } from "net";
import { Middleware } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  setRawMessagesReceived,
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
import { OutgoingMessageAction, OUTGOING_MESSAGE } from "@app/actions/outgoing";
import { CRLF, IRC_MESSAGE_LENGTH } from "@app/middlewares/constants";

const sockets: { [serverKey: string]: { socket: Socket; buffer: string } } = {};

export const network: Middleware<{}, RootState> = store => next => (
  action: OutgoingMessageAction | ConnectServerAction | DisconnectServerAction,
) => {
  next(action);

  switch (action.type) {
    case OUTGOING_MESSAGE:
      sockets[action.serverKey].socket.write(
        action.payload.raw.length > IRC_MESSAGE_LENGTH - CRLF.length
          ? `${action.payload.raw.slice(0, IRC_MESSAGE_LENGTH)}${CRLF}`
          : `${action.payload.raw}${CRLF}`,
      );
      break;

    case CONNECT_SERVER:
      const socket = new Socket();
      const serverKey = Math.random()
        .toString(36)
        .slice(2, 10);

      sockets[serverKey] = { socket, buffer: "" };

      socket.connect({
        host: action.payload.host,
        port: action.payload.port,
      });

      socket.on("lookup", (error, address, family, host) =>
        store.dispatch(lookup(serverKey, error, address, family, host)),
      );

      socket.on("connect", () =>
        store.dispatch(setConnectionEstablished(serverKey)),
      );

      socket.on("data", bytes => {
        sockets[serverKey].buffer += bytes;
        const messages = sockets[serverKey].buffer.split(CRLF);
        sockets[serverKey].buffer = messages.pop() || "";

        store.dispatch(setRawMessagesReceived(serverKey, messages));
      });

      socket.on("close", hadError =>
        store.dispatch(setConnectionClosed(serverKey, hadError)),
      );

      socket.on("error", ({ name, message, stack }) => {
        store.dispatch(setConnectionFailed(serverKey, name, message));

        // tslint:disable-next-line
        console.log("socket error", stack);
      });

      socket.on("end", () =>
        // tslint:disable-next-line
        console.warn("unhandled socket end"),
      );

      socket.on("timeout", () =>
        // tslint:disable-next-line
        console.warn("unhandled socket timeout"),
      );

      break;

    case DISCONNECT_SERVER:
      sockets[action.route.serverKey].socket.end();
      break;
  }
};
