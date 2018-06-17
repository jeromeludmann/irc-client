import {
  MessageAction,
  MessageActionCreator,
  isPrefixServer,
  Server,
  User,
} from "@app/actions/messages/raw";

interface ServerPing {
  server: Server;
  key: string;
}

interface UserPing {
  user: User;
  key: string;
}

export const MESSAGE_SERVER_PING = "MESSAGE/SERVER_PING";
export const MESSAGE_USER_PING = "MESSAGE/USER_PING";

export type ServerPingAction = MessageAction<
  typeof MESSAGE_SERVER_PING,
  ServerPing
>;

export type UserPingAction = MessageAction<typeof MESSAGE_USER_PING, UserPing>;

export const pingReceived: MessageActionCreator<
  ServerPingAction | UserPingAction
> = (prefix, params) => {
  const key = params.join(" ");

  return isPrefixServer(prefix)
    ? serverPing(prefix as Server, key)
    : userPing(prefix as User, key);
};

const serverPing = (server: Server, key: string): ServerPingAction => ({
  type: MESSAGE_SERVER_PING,
  payload: { server, key },
  route: { channel: "status" },
});

const userPing = (user: User, key: string): UserPingAction => ({
  type: MESSAGE_USER_PING,
  payload: { user, key },
  route: { channel: "status" },
});
