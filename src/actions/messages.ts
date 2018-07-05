import { Action } from "redux";
import {
  Route,
  BROADCAST_ALL,
  STATUS,
  isChannel,
  BROADCAST_ACTIVE,
} from "@app/Route";
import { Prefix, User, Server, isPrefixServer } from "@app/Message";

export interface MessageAction<T, M> extends Action<T> {
  payload: M;
  route: Route;
}

export type MessageActionCreator<A, P = Prefix | void> = (
  serverKey: string,
  prefix: P,
  params: string[],
) => A;

// ERROR

interface Error {
  message: string;
}

export const ERROR = "MESSAGE/ERROR";

export type ErrorAction = MessageAction<typeof ERROR, Error>;

export const error: MessageActionCreator<ErrorAction, void> = (
  serverKey,
  _,
  params,
) => ({
  type: ERROR,
  payload: { message: params[0] },
  route: { serverKey, channelKey: BROADCAST_ALL },
});

// JOIN

interface Join {
  user: User;
  channel: string;
}

export const JOIN = "MESSAGE/JOIN";

export type JoinAction = MessageAction<typeof JOIN, Join>;

export const join: MessageActionCreator<JoinAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: JOIN,
  payload: { user, channel: params[0] },
  route: { serverKey, channelKey: params[0] },
});

// NICK

interface Nick {
  user: User;
  nick: string;
}

export const NICK = "MESSAGE/NICK";

export type NickAction = MessageAction<typeof NICK, Nick>;

export const nick: MessageActionCreator<NickAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: NICK,
  payload: { user, nick: params[0] },
  route: { serverKey, channelKey: STATUS },
});

// NOTICE

interface NoticeFromServer {
  server: Server;
  text: string;
}

interface NoticeFromChannel {
  user: User;
  channel: string;
  text: string;
}

interface NoticeFromUser {
  user: User;
  text: string;
}

export const NOTICE_FROM_SERVER = "MESSAGE/NOTICE_FROM_SERVER";

export const NOTICE_FROM_CHANNEL = "MESSAGE/NOTICE_FROM_CHANNEL";

export const NOTICE_FROM_USER = "MESSAGE/NOTICE_FROM_USER";

export type NoticeFromServerAction = MessageAction<
  typeof NOTICE_FROM_SERVER,
  NoticeFromServer
>;

export type NoticeFromChannelAction = MessageAction<
  typeof NOTICE_FROM_CHANNEL,
  NoticeFromChannel
>;

export type NoticeFromUserAction = MessageAction<
  typeof NOTICE_FROM_USER,
  NoticeFromUser
>;

export const notice: MessageActionCreator<
  NoticeFromServerAction | NoticeFromChannelAction | NoticeFromUserAction,
  Prefix
> = (serverKey, prefix, params) => {
  if (isPrefixServer(prefix)) {
    return {
      type: NOTICE_FROM_SERVER,
      payload: { server: prefix as Server, text: params[1] },
      route: { serverKey, channelKey: STATUS },
    };
  }

  return isChannel(params[0])
    ? {
        type: NOTICE_FROM_CHANNEL,
        payload: { user: prefix as User, channel: params[0], text: params[1] },
        route: { serverKey, channelKey: params[0] },
      }
    : {
        type: NOTICE_FROM_USER,
        payload: { user: prefix as User, text: params[1] },
        route: { serverKey, channelKey: BROADCAST_ACTIVE },
      };
};

// PART

interface Part {
  user: User;
  channel: string;
  message?: string;
}

export const PART = "MESSAGE/PART";

export type PartAction = MessageAction<typeof PART, Part>;

export const part: MessageActionCreator<PartAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: PART,
  payload: { user, channel: params[0], message: params[1] },
  route: { serverKey, channelKey: params[0] },
});

// PING

interface PingFromServer {
  key: string;
}

export const PING_FROM_SERVER = "MESSAGE/PING_FROM_SERVER";

export type PingFromServerAction = MessageAction<
  typeof PING_FROM_SERVER,
  PingFromServer
>;

export const ping: MessageActionCreator<PingFromServerAction> = (
  serverKey,
  _,
  params,
) => ({
  type: PING_FROM_SERVER,
  payload: { key: params.join(" ") },
  route: { serverKey, channelKey: STATUS },
});

// PRIVMSG

interface Privmsg {
  user: User;
  text: string;
}

export const PRIVMSG = "MESSAGE/PRIVMSG";

export type PrivmsgAction = MessageAction<typeof PRIVMSG, Privmsg>;

export const privmsg: MessageActionCreator<PrivmsgAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: PRIVMSG,
  payload: { user, text: params[1] },
  route: {
    serverKey,
    channelKey: isChannel(params[0]) ? params[0] : user.nick,
  },
});

// RPL_MYINFO

interface ReplyMyInfo {
  serverName: string;
  version: string;
  availableUserModes: string[];
  availableChannelModes: string[];
}

export const RPL_MYINFO = "MESSAGE/RPL_MYINFO";

export type ReplyMyInfoAction = MessageAction<typeof RPL_MYINFO, ReplyMyInfo>;

export const replyMyInfo: MessageActionCreator<ReplyMyInfoAction, Server> = (
  serverKey,
  _,
  params,
) => {
  const [, serverName, version] = params;
  const availableUserModes = params[3].split("");
  const availableChannelModes = params[4].split("");

  return {
    type: RPL_MYINFO,
    payload: {
      serverName,
      version,
      availableUserModes,
      availableChannelModes,
    },
    route: { serverKey, channelKey: STATUS },
  };
};
