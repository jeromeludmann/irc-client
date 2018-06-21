import { Action } from "redux";
import { Route, STATUS_BUFFER } from "@app/Route";

export interface IncomingMessageAction<T, M> extends Action<T> {
  payload: M;
  route: Route;
}

export type IncomingMessageActionCreator<A, P = Prefix> = (
  serverKey: string,
  prefix: P,
  params: string[],
) => A;

export type Prefix = Server | User;

export type Server = string;

export type User = {
  nick: string;
  user: string;
  host: string;
};

export const isChannel = (channel: string) => /^(&|#|\+|!)/.test(channel);

export const isPrefixServer = (prefix: Prefix) => typeof prefix === "string";

export const isPrefixUser = (prefix: Prefix) => !isPrefixServer(prefix);

// JOIN

interface Join {
  user: User;
  channel: string;
}

export const JOIN = "MESSAGE/INCOMING/JOIN";

export type JoinAction = IncomingMessageAction<typeof JOIN, Join>;

export const join: IncomingMessageActionCreator<JoinAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: JOIN,
  payload: { user, channel: params[0] },
  route: { serverKey, bufferKey: params[0] },
});

// NICK

interface Nick {
  user: User;
  nick: string;
}

export const NICK = "MESSAGE/INCOMING/NICK";

export type NickAction = IncomingMessageAction<typeof NICK, Nick>;

export const nick: IncomingMessageActionCreator<NickAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: NICK,
  payload: { user, nick: params[0] },
  route: { serverKey, bufferKey: STATUS_BUFFER },
});

// NOTICE

interface ServerNotice {
  server: Server;
  text: string;
}

interface ChannelNotice {
  user: User;
  channel: string;
  text: string;
}

interface UserNotice {
  user: User;
  text: string;
}

export const SERVER_NOTICE = "MESSAGE/INCOMING/SERVER_NOTICE";

export const CHANNEL_NOTICE = "MESSAGE/INCOMING/CHANNEL_NOTICE";

export const USER_NOTICE = "MESSAGE/INCOMING/USER_NOTICE";

export type ServerNoticeAction = IncomingMessageAction<
  typeof SERVER_NOTICE,
  ServerNotice
>;

export type ChannelNoticeAction = IncomingMessageAction<
  typeof CHANNEL_NOTICE,
  ChannelNotice
>;

export type UserNoticeAction = IncomingMessageAction<
  typeof USER_NOTICE,
  UserNotice
>;

export const notice: IncomingMessageActionCreator<
  ServerNoticeAction | ChannelNoticeAction | UserNoticeAction
> = (serverKey, prefix, params) => {
  if (isPrefixServer(prefix)) {
    return {
      type: SERVER_NOTICE,
      payload: { server: prefix as Server, text: params[1] },
      route: { serverKey, bufferKey: STATUS_BUFFER },
    };
  }

  return isChannel(params[0])
    ? {
        type: CHANNEL_NOTICE,
        payload: { user: prefix as User, channel: params[0], text: params[1] },
        route: { serverKey, bufferKey: params[0] },
      }
    : {
        type: USER_NOTICE,
        payload: { user: prefix as User, text: params[1] },
        route: { serverKey, bufferKey: STATUS_BUFFER },
      };
};

// PING

interface ServerPing {
  key: string;
}

export const SERVER_PING = "MESSAGE/INCOMING/SERVER_PING";

export type ServerPingAction = IncomingMessageAction<
  typeof SERVER_PING,
  ServerPing
>;

export const ping: IncomingMessageActionCreator<ServerPingAction, Server> = (
  serverKey,
  _server,
  params,
) => ({
  type: SERVER_PING,
  payload: { key: params.join(" ") },
  route: { serverKey, bufferKey: STATUS_BUFFER },
});

// PRIVMSG

interface ChannelPrivmsg {
  user: User;
  channel: string;
  text: string;
}

interface UserPrivmsg {
  user: User;
  text: string;
}

export const CHANNEL_PRIVMSG = "MESSAGE/INCOMING/CHANNEL_PRIVMSG";

export const USER_PRIVMSG = "MESSAGE/INCOMING/USER_PRIVMSG";

export type ChannelPrivmsgAction = IncomingMessageAction<
  typeof CHANNEL_PRIVMSG,
  ChannelPrivmsg
>;

export type UserPrivmsgAction = IncomingMessageAction<
  typeof USER_PRIVMSG,
  UserPrivmsg
>;

export const privmsg: IncomingMessageActionCreator<
  ChannelPrivmsgAction | UserPrivmsgAction,
  User
> = (serverKey, user, params) => {
  const target = params[0];
  const text = params[1];

  return isChannel(target)
    ? {
        type: CHANNEL_PRIVMSG,
        payload: { user, channel: target, text },
        route: { serverKey, bufferKey: target },
      }
    : {
        type: USER_PRIVMSG,
        payload: { user, text },
        route: { serverKey, bufferKey: user.nick },
      };
};
