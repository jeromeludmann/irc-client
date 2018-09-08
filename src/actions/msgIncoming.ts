import {
  RoutedAction,
  BROADCAST_ALL,
  STATUS,
  isChannel,
  BROADCAST_ACTIVE,
} from "@app/Route";
import { User, Server, Prefix, isPrefixServer } from "@app/Message";

interface ReceiveMessageAction<T = string, P = {}> extends RoutedAction<T> {
  payload: P;
}

export const RECEIVE_ERROR = "MESSAGE/RECEIVE_ERROR";

export type ReceiveErrorAction = ReceiveMessageAction<
  typeof RECEIVE_ERROR,
  {
    message: string;
  }
>;

export const RECEIVE_JOIN = "MESSAGE/RECEIVE_JOIN";

export type ReceiveJoinAction = ReceiveMessageAction<
  typeof RECEIVE_JOIN,
  {
    user: User;
    channel: string;
  }
>;

export const RECEIVE_NICK = "MESSAGE/RECEIVE_NICK";

export type ReceiveNickAction = ReceiveMessageAction<
  typeof RECEIVE_NICK,
  {
    user: User;
    nick: string;
  }
>;

export const RECEIVE_NOTICE_FROM_SERVER = "MESSAGE/RECEIVE_NOTICE_FROM_SERVER";
export const RECEIVE_NOTICE_FROM_CHANNEL =
  "MESSAGE/RECEIVE_NOTICE_FROM_CHANNEL";
export const RECEIVE_NOTICE_FROM_USER = "MESSAGE/RECEIVE_NOTICE_FROM_USER";

export type ReceiveNoticeFromServerAction = ReceiveMessageAction<
  typeof RECEIVE_NOTICE_FROM_SERVER,
  {
    server: Server;
    text: string;
  }
>;

export type ReceiveNoticeFromChannelAction = ReceiveMessageAction<
  typeof RECEIVE_NOTICE_FROM_CHANNEL,
  {
    user: User;
    channel: string;
    text: string;
  }
>;

export type ReceiveNoticeFromUserAction = ReceiveMessageAction<
  typeof RECEIVE_NOTICE_FROM_USER,
  {
    user: User;
    text: string;
  }
>;

export type ReceiveNoticeActions =
  | ReceiveNoticeFromServerAction
  | ReceiveNoticeFromChannelAction
  | ReceiveNoticeFromUserAction;

export const RECEIVE_PART = "MESSAGE/RECEIVE_PART";

export type ReceivePartAction = ReceiveMessageAction<
  typeof RECEIVE_PART,
  {
    user: User;
    channel: string;
    message?: string;
  }
>;

export const RECEIVE_PING_FROM_SERVER = "MESSAGE/RECEIVE_PING_FROM_SERVER";

export type ReceivePingFromServerAction = ReceiveMessageAction<
  typeof RECEIVE_PING_FROM_SERVER,
  {
    key: string;
  }
>;

export const RECEIVE_PONG_FROM_SERVER = "MESSAGE/RECEIVE_PONG_FROM_SERVER";

export type ReceivePongFromServerAction = ReceiveMessageAction<
  typeof RECEIVE_PONG_FROM_SERVER,
  {
    key: string;
    lag: number;
  }
>;

export const RECEIVE_PRIVMSG = "MESSAGE/RECEIVE_PRIVMSG";

export type ReceivePrivmsgAction = ReceiveMessageAction<
  typeof RECEIVE_PRIVMSG,
  {
    user: User;
    text: string;
  }
>;

export const RECEIVE_RPL_MYINFO = "MESSAGE/RECEIVE_RPL_MYINFO";

export type ReceiveReplyMyInfoAction = ReceiveMessageAction<
  typeof RECEIVE_RPL_MYINFO,
  {
    serverName: string;
    version: string;
    availableUserModes: string[];
    availableChannelModes: string[];
  }
>;

export const messageReceivers: {
  [command: string]: (
    serverKey: string,
    prefix: Prefix | void,
    params: string[],
  ) => ReceiveMessageAction;
} = {
  ERROR: (serverKey, _: void, params): ReceiveErrorAction => ({
    type: RECEIVE_ERROR,
    payload: { message: params[0] },
    route: { serverKey, channelKey: BROADCAST_ALL },
  }),

  JOIN: (serverKey, user: User, params): ReceiveJoinAction => ({
    type: RECEIVE_JOIN,
    payload: { user, channel: params[0] },
    route: { serverKey, channelKey: params[0] },
  }),

  NICK: (serverKey, user: User, params): ReceiveNickAction => ({
    type: RECEIVE_NICK,
    payload: { user, nick: params[0] },
    route: { serverKey, channelKey: STATUS },
  }),

  NOTICE: (serverKey, prefix: Prefix, params): ReceiveNoticeActions => {
    if (isPrefixServer(prefix)) {
      return {
        type: RECEIVE_NOTICE_FROM_SERVER,
        payload: { server: prefix as Server, text: params[1] },
        route: { serverKey, channelKey: STATUS },
      };
    }

    return isChannel(params[0])
      ? {
          type: RECEIVE_NOTICE_FROM_CHANNEL,
          payload: {
            user: prefix as User,
            channel: params[0],
            text: params[1],
          },
          route: { serverKey, channelKey: params[0] },
        }
      : {
          type: RECEIVE_NOTICE_FROM_USER,
          payload: { user: prefix as User, text: params[1] },
          route: { serverKey, channelKey: BROADCAST_ACTIVE },
        };
  },

  PART: (serverKey, user: User, params): ReceivePartAction => ({
    type: RECEIVE_PART,
    payload: { user, channel: params[0], message: params[1] },
    route: { serverKey, channelKey: params[0] },
  }),

  PING: (serverKey, _server: Server, params): ReceivePingFromServerAction => ({
    type: RECEIVE_PING_FROM_SERVER,
    payload: { key: params.join(" ") },
    route: { serverKey, channelKey: STATUS },
  }),

  PONG: (serverKey, _server: Server, params): ReceivePongFromServerAction => ({
    type: RECEIVE_PONG_FROM_SERVER,
    payload: { key: params[1], lag: 0 },
    route: { serverKey, channelKey: STATUS },
  }),

  PRIVMSG: (serverKey, user: User, params): ReceivePrivmsgAction => ({
    type: RECEIVE_PRIVMSG,
    payload: { user, text: params[1] },
    route: {
      serverKey,
      channelKey: isChannel(params[0]) ? params[0] : user.nick,
    },
  }),

  "004": (serverKey, _server: Server, params): ReceiveReplyMyInfoAction => {
    const [, serverName, version] = params;
    const availableUserModes = params[3].split("");
    const availableChannelModes = params[4].split("");

    return {
      type: RECEIVE_RPL_MYINFO,
      payload: {
        serverName,
        version,
        availableUserModes,
        availableChannelModes,
      },
      route: { serverKey, channelKey: STATUS },
    };
  },
};
