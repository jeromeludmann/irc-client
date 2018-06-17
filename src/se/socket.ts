import { Socket } from "net";
import { Middleware } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  setMessagesReceived,
  setConnectionFailed,
  lookup,
} from "@app/actions/socket";
import { CommandAction, SEND_COMMAND } from "@app/actions/commands";
import { RootState } from "@app/state";
import {
  ConnectServerAction,
  DisconnectServerAction,
  CONNECT_SERVER,
  DISCONNECT_SERVER,
} from "@app/actions/server";

// TODO multi servers
let singletonSocket: Socket;
let buffer = "";

export const socket: Middleware<{}, RootState> = store => next => (
  action: CommandAction | ConnectServerAction | DisconnectServerAction,
) => {
  next(action);

  switch (action.type) {
    case SEND_COMMAND:
      // TODO use serverKey to get socket
      // const serverKey = store.getState().active.server;
      singletonSocket.write(`${action.payload.command}\r\n`);
      break;

    case CONNECT_SERVER:
      singletonSocket = new Socket();
      singletonSocket.connect({
        host: action.payload.host,
        port: action.payload.port,
      });

      singletonSocket.on("lookup", (error, address, family, host) =>
        store.dispatch(lookup(error, address, family, host)),
      );

      singletonSocket.on("connect", () =>
        store.dispatch(setConnectionEstablished()),
      );

      singletonSocket.on("data", bytes => {
        buffer += bytes;
        const messages = buffer.split("\r\n");
        buffer = messages.pop() || "";

        store.dispatch(setMessagesReceived("serverKey", messages));
      });

      singletonSocket.on("close", hadError =>
        store.dispatch(setConnectionClosed(hadError)),
      );

      singletonSocket.on("error", ({ name, message, stack }) => {
        store.dispatch(setConnectionFailed(name, message));
        // tslint:disable-next-line
        console.log("unhandled socket error", stack);
      });

      singletonSocket.on("end", () =>
        // tslint:disable-next-line
        console.log("unhandled socket end"),
      );

      singletonSocket.on("timeout", () =>
        // tslint:disable-next-line
        console.log("unhandled socket timeout"),
      );

      break;

    case DISCONNECT_SERVER:
      singletonSocket.end();
      break;
  }
};
