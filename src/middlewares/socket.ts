import { Socket } from "net";
import { Middleware } from "redux";
import {
  setConnectionEstablished,
  setConnectionClosed,
  setRawMessagesReceived,
  setConnectionFailed,
  lookup,
} from "@app/actions/socket";
import { RootState } from "@app/reducers";
import {
  ConnectServerAction,
  DisconnectServerAction,
  CONNECT_SERVER,
  DISCONNECT_SERVER,
} from "@app/actions/server";
import { CommandAction, COMMAND_RAW } from "@app/actions/commands";

// TODO multi servers
let singletonSocket: Socket;
let buffer = "";

export const socket: Middleware<{}, RootState> = store => next => (
  action: CommandAction | ConnectServerAction | DisconnectServerAction,
) => {
  next(action);

  switch (action.type) {
    case COMMAND_RAW:
      // TODO action.serverKey
      singletonSocket.write(`${action.payload.raw}\r\n`);
      break;

    case CONNECT_SERVER:
      singletonSocket = new Socket();
      singletonSocket.connect({
        host: action.payload.host,
        port: action.payload.port,
      });

      singletonSocket.on("lookup", (error, address, family, host) =>
        store.dispatch(lookup("serverKey", error, address, family, host)),
      );

      singletonSocket.on("connect", () =>
        store.dispatch(setConnectionEstablished("serverKey")),
      );

      singletonSocket.on("data", bytes => {
        buffer += bytes;
        const messages = buffer.split("\r\n");
        buffer = messages.pop() || "";

        store.dispatch(setRawMessagesReceived("serverKey", messages));
      });

      singletonSocket.on("close", hadError =>
        store.dispatch(setConnectionClosed("serverKey", hadError)),
      );

      singletonSocket.on("error", ({ name, message, stack }) => {
        store.dispatch(setConnectionFailed("serverKey", name, message));

        // tslint:disable-next-line
        console.log("socket error", stack);
      });

      singletonSocket.on("end", () =>
        // tslint:disable-next-line
        console.warn("unhandled socket end"),
      );

      singletonSocket.on("timeout", () =>
        // tslint:disable-next-line
        console.warn("unhandled socket timeout"),
      );

      break;

    case DISCONNECT_SERVER:
      singletonSocket.end();
      break;
  }
};
