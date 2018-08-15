import {
  BROADCAST_ALL,
  STATUS,
  isChannel,
  BROADCAST_ACTIVE,
  RoutedAction,
} from "@app/Route";
import { Prefix, User, Server, isPrefixServer } from "@app/Message";
import { SEND_RAW_MESSAGE, SendRawMessageAction } from "@app/actions/socket";

//
// Messages received
//

interface MessageAction<T = string, P = {}> extends RoutedAction<T> {
  payload: P;
}

// ERROR received

export const ERROR = "MESSAGE/ERROR";

export type ErrorAction = MessageAction<
  typeof ERROR,
  {
    message: string;
  }
>;

// JOIN received

export const JOIN = "MESSAGE/JOIN";

export type JoinAction = MessageAction<
  typeof JOIN,
  {
    user: User;
    channel: string;
  }
>;

// NICK received

export const NICK = "MESSAGE/NICK";

export type NickAction = MessageAction<
  typeof NICK,
  {
    user: User;
    nick: string;
  }
>;

// NOTICE received

export const NOTICE_FROM_SERVER = "MESSAGE/NOTICE_FROM_SERVER";
export const NOTICE_FROM_CHANNEL = "MESSAGE/NOTICE_FROM_CHANNEL";
export const NOTICE_FROM_USER = "MESSAGE/NOTICE_FROM_USER";

export type NoticeFromServerAction = MessageAction<
  typeof NOTICE_FROM_SERVER,
  {
    server: Server;
    text: string;
  }
>;

export type NoticeFromChannelAction = MessageAction<
  typeof NOTICE_FROM_CHANNEL,
  {
    user: User;
    channel: string;
    text: string;
  }
>;

export type NoticeFromUserAction = MessageAction<
  typeof NOTICE_FROM_USER,
  {
    user: User;
    text: string;
  }
>;

export type NoticeActions =
  | NoticeFromServerAction
  | NoticeFromChannelAction
  | NoticeFromUserAction;

// PART received

export const PART = "MESSAGE/PART";

export type PartAction = MessageAction<
  typeof PART,
  {
    user: User;
    channel: string;
    message?: string;
  }
>;

// PING received

export const PING_FROM_SERVER = "MESSAGE/PING_FROM_SERVER";

export type PingFromServerAction = MessageAction<
  typeof PING_FROM_SERVER,
  {
    key: string;
  }
>;

// PRIVMSG received

export const PRIVMSG = "MESSAGE/PRIVMSG";

export type PrivmsgAction = MessageAction<
  typeof PRIVMSG,
  {
    user: User;
    text: string;
  }
>;

// RPL_MYINFO received

export const RPL_MYINFO = "MESSAGE/RPL_MYINFO";

export type ReplyMyInfoAction = MessageAction<
  typeof RPL_MYINFO,
  {
    serverName: string;
    version: string;
    availableUserModes: string[];
    availableChannelModes: string[];
  }
>;

// Message received callbacks

export const messageCallbacks: {
  [command: string]: (
    serverKey: string,
    prefix: Prefix | void,
    params: string[],
  ) => MessageAction;
} = {
  ERROR: (serverKey, _: void, params): ErrorAction => ({
    type: ERROR,
    payload: { message: params[0] },
    route: { serverKey, channelKey: BROADCAST_ALL },
  }),

  JOIN: (serverKey, user: User, params): JoinAction => ({
    type: JOIN,
    payload: { user, channel: params[0] },
    route: { serverKey, channelKey: params[0] },
  }),

  NICK: (serverKey, user: User, params): NickAction => ({
    type: NICK,
    payload: { user, nick: params[0] },
    route: { serverKey, channelKey: STATUS },
  }),

  NOTICE: (serverKey, prefix: Prefix, params): NoticeActions => {
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
          payload: {
            user: prefix as User,
            channel: params[0],
            text: params[1],
          },
          route: { serverKey, channelKey: params[0] },
        }
      : {
          type: NOTICE_FROM_USER,
          payload: { user: prefix as User, text: params[1] },
          route: { serverKey, channelKey: BROADCAST_ACTIVE },
        };
  },

  PART: (serverKey, user: User, params): PartAction => ({
    type: PART,
    payload: { user, channel: params[0], message: params[1] },
    route: { serverKey, channelKey: params[0] },
  }),

  PING: (serverKey, _server: Server, params): PingFromServerAction => ({
    type: PING_FROM_SERVER,
    payload: { key: params.join(" ") },
    route: { serverKey, channelKey: STATUS },
  }),

  PRIVMSG: (serverKey, user: User, params): PrivmsgAction => ({
    type: PRIVMSG,
    payload: { user, text: params[1] },
    route: {
      serverKey,
      channelKey: isChannel(params[0]) ? params[0] : user.nick,
    },
  }),

  "004": (serverKey, _server: Server, params): ReplyMyInfoAction => {
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
  },
};

//
// Send messages
//

const getRawMessage = (command: string, ...params: string[]): string => {
  const last = params.length - 1;

  if (params[last].indexOf(" ") > -1 || params[last].charAt(0) === ":") {
    params[last] = `:${params[last]}`;
  }

  return `${command.toUpperCase()} ${params.join(" ")}`;
};

// Send JOIN

// export const SEND_JOIN = "MESSAGE/SEND_JOIN";

// export type SendJoinAction = MessageAction<typeof SEND_JOIN>;

export const sendJoin = (
  serverKey: string,
  channel: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("join", channel) },
  serverKey,
  specificAction: undefined,
});

// Send PRIVMSG

export const SEND_PRIVMSG = "MESSAGE/SEND_PRIVMSG";

export type SendPrivmsgAction = MessageAction<
  typeof SEND_PRIVMSG,
  { text: string }
>;

export const sendPrivmsg = (
  serverKey: string,
  channel: string,
  text: string,
): SendRawMessageAction<SendPrivmsgAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("privmsg", channel, text) },
  serverKey,
  specificAction: {
    type: SEND_PRIVMSG,
    payload: { text },
    route: { serverKey, channelKey: channel },
  },
});

// Send NICK

// export const SEND_NICK = "MESSAGE/SEND_NICK";

// export type SendNickAction = MessageAction<typeof SEND_NICK>;

export const sendNick = (
  serverKey: string,
  nick: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("nick", nick) },
  serverKey,
  specificAction: undefined,
});

// Send PART

// export const SEND_PART = "MESSAGE/SEND_PART";

// export type SendPartAction = MessageAction<typeof SEND_PART>;

export const sendPart = (
  serverKey: string,
  channel: string,
  text: string = "",
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("part", channel, text) },
  serverKey,
  specificAction: undefined,
});

// Send PING

// export const SEND_PING_TO_SERVER = "MESSAGE/SEND_PING_TO_SERVER";

// export type SendPingToServerAction = MessageAction<typeof SEND_PING_TO_SERVER>;

export const sendPingToServer = (
  serverKey: string,
  key: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("ping", key) },
  serverKey,
  specificAction: undefined,
});

// Send PONG

export const SEND_PONG_TO_SERVER = "MESSAGE/SEND_PONG_TO_SERVER";

export type SendPongToServerAction = MessageAction<
  typeof SEND_PONG_TO_SERVER,
  {
    key: string;
  }
>;

export const sendPongToServer = (
  serverKey: string,
  key: string,
): SendRawMessageAction<SendPongToServerAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("pong", key) },
  serverKey,
  specificAction: {
    type: SEND_PONG_TO_SERVER,
    payload: { key },
    route: { serverKey, channelKey: STATUS },
  },
});

// Send QUIT

// export const SEND_QUIT = "MESSAGE/SEND_QUIT";

// export type SendQuitAction = MessageAction<typeof SEND_QUIT>;

export const sendQuit = (
  serverKey: string,
  text: string = "",
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("quit", text) },
  serverKey,
  specificAction: undefined,
});

// Send USER

// export const SEND_USER = "MESSAGE/SEND_USER";

// export type SendUserAction = MessageAction<typeof SEND_USER>;

export const sendUser = (
  serverKey: string,
  username: string,
  realname: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("user", username, "0", "*", realname) },
  serverKey,
  specificAction: undefined,
});
