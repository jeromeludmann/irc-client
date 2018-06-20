import {
  MessageAction,
  MessageActionCreator,
  Server,
} from "@app/actions/messages/helpers";
import { STATUS_WINDOW } from "@app/Route";

interface ServerPing {
  key: string;
}

export const MESSAGE_SERVER_PING = "MESSAGE/SERVER_PING";

export type ServerPingAction = MessageAction<
  typeof MESSAGE_SERVER_PING,
  ServerPing
>;

export const pingReceived: MessageActionCreator<ServerPingAction, Server> = (
  serverKey,
  _server,
  params,
) => ({
  type: MESSAGE_SERVER_PING,
  payload: { key: params.join(" ") },
  route: { server: serverKey, window: STATUS_WINDOW },
});
