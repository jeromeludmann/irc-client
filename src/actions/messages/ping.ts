import {
  MessageAction,
  MessageActionCreator,
  Prefix,
} from "@app/actions/messages/raw";

interface Ping {
  server: Prefix;
  key: string;
}

export const MESSAGE_PING = "MESSAGE/PING";

export type PingAction = MessageAction<typeof MESSAGE_PING, Ping>;

export const pingReceived: MessageActionCreator<PingAction> = (
  prefix,
  params,
) => {
  // TODO MESSAGE_PING_SERVER
  // TODO MESSAGE_PING_USER

  return {
    type: MESSAGE_PING,
    payload: { server: prefix, key: params.join(" ") },
    route: { channel: "status" },
  };
};
