import { Socket } from "net";
import { Middleware } from "redux";
import {
  socketConnect,
  socketClose,
  socketData,
  socketError,
  socketEnd,
} from "@app/actions/socket";
import { CommandAction, SEND_COMMAND } from "@app/actions/commands";
import { RootState } from "@app/state";
import {
  ConnectAction,
  DisconnectAction,
  CONNECT_SERVER,
  DISCONNECT_SERVER,
} from "@app/actions/socket";

// TODO multi servers
let singletonSocket: Socket;
let buffer = "";

export const socket: Middleware<{}, RootState> = store => next => (
  action: CommandAction | ConnectAction | DisconnectAction,
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

      // TODO
      // singletonSocket.on("lookup", (err, address, family, host) => {});

      singletonSocket.on("connect", () => store.dispatch(socketConnect()));

      singletonSocket.on("data", bytes => {
        buffer += bytes;
        const messages = buffer.split("\r\n");
        buffer = messages.pop() || "";

        store.dispatch(socketData("serverKey", messages));
      });

      singletonSocket.on("end", () => store.dispatch(socketEnd()));

      singletonSocket.on("close", hadError =>
        store.dispatch(socketClose(hadError)),
      );

      // TODO socket timeout
      // singletonSocket.on("timeout", () => {});

      // TODO socket drain
      // singletonSocket.on("drain", () => {});

      singletonSocket.on("error", ({ name, message, stack }) => {
        store.dispatch(socketError(name, message));
        // tslint:disable-next-line
        console.log("connection error", stack);
      });

      break;

    case DISCONNECT_SERVER:
      singletonSocket.end();
      break;
  }
};
