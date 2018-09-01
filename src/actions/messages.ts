import {
  BROADCAST_ALL,
  STATUS,
  isChannel,
  BROADCAST_ACTIVE,
  RoutedAction,
  BROADCAST_NONE
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

export const ERROR_RECEIVED = "MESSAGE/ERROR";

export type ErrorReceivedAction = MessageAction<
  typeof ERROR_RECEIVED,
  {
    message: string;
  }
>;

// JOIN received

export const JOIN_RECEIVED = "MESSAGE/JOIN";

export type JoinReceivedAction = MessageAction<
  typeof JOIN_RECEIVED,
  {
    user: User;
    channel: string;
  }
>;

// NICK received

export const NICK_RECEIVED = "MESSAGE/NICK";

export type NickReceivedAction = MessageAction<
  typeof NICK_RECEIVED,
  {
    user: User;
    nick: string;
  }
>;

// NOTICE received

export const NOTICE_FROM_SERVER_RECEIVED = "MESSAGE/NOTICE_FROM_SERVER";
export const NOTICE_FROM_CHANNEL_RECEIVED = "MESSAGE/NOTICE_FROM_CHANNEL";
export const NOTICE_FROM_USER_RECEIVED = "MESSAGE/NOTICE_FROM_USER";

export type NoticeFromServerReceivedAction = MessageAction<
  typeof NOTICE_FROM_SERVER_RECEIVED,
  {
    server: Server;
    text: string;
  }
>;

export type NoticeFromChannelReceivedAction = MessageAction<
  typeof NOTICE_FROM_CHANNEL_RECEIVED,
  {
    user: User;
    channel: string;
    text: string;
  }
>;

export type NoticeFromUserReceivedAction = MessageAction<
  typeof NOTICE_FROM_USER_RECEIVED,
  {
    user: User;
    text: string;
  }
>;

export type NoticeReceivedActions =
  | NoticeFromServerReceivedAction
  | NoticeFromChannelReceivedAction
  | NoticeFromUserReceivedAction;

// PART received

export const PART_RECEIVED = "MESSAGE/PART";

export type PartReceivedAction = MessageAction<
  typeof PART_RECEIVED,
  {
    user: User;
    channel: string;
    message?: string;
  }
>;

// PING received

export const PING_FROM_SERVER_RECEIVED = "MESSAGE/PING_FROM_SERVER";

export type PingFromServerReceivedAction = MessageAction<
  typeof PING_FROM_SERVER_RECEIVED,
  {
    key: string;
  }
>;

// PRIVMSG received

export const PRIVMSG_RECEIVED = "MESSAGE/PRIVMSG";

export type PrivmsgReceivedAction = MessageAction<
  typeof PRIVMSG_RECEIVED,
  {
    user: User;
    text: string;
  }
>;

// RPL_MYINFO received

export const RPL_MYINFO_RECEIVED = "MESSAGE/RPL_MYINFO";

export type ReplyMyInfoReceivedAction = MessageAction<
  typeof RPL_MYINFO_RECEIVED,
  {
    serverName: string;
    version: string;
    availableUserModes: string[];
    availableChannelModes: string[];
  }
>;

// Message received callbacks

export const messagesReceived: {
  [command: string]: (
    serverKey: string,
    prefix: Prefix | void,
    params: string[]
  ) => MessageAction;
} = {
  ERROR: (serverKey, _: void, params): ErrorReceivedAction => ({
    type: ERROR_RECEIVED,
    payload: { message: params[0] },
    route: { serverKey, channelKey: BROADCAST_ALL }
  }),

  JOIN: (serverKey, user: User, params): JoinReceivedAction => ({
    type: JOIN_RECEIVED,
    payload: { user, channel: params[0] },
    route: { serverKey, channelKey: params[0] }
  }),

  NICK: (serverKey, user: User, params): NickReceivedAction => ({
    type: NICK_RECEIVED,
    payload: { user, nick: params[0] },
    route: { serverKey, channelKey: STATUS }
  }),

  NOTICE: (serverKey, prefix: Prefix, params): NoticeReceivedActions => {
    if (isPrefixServer(prefix)) {
      return {
        type: NOTICE_FROM_SERVER_RECEIVED,
        payload: { server: prefix as Server, text: params[1] },
        route: { serverKey, channelKey: STATUS }
      };
    }

    return isChannel(params[0])
      ? {
          type: NOTICE_FROM_CHANNEL_RECEIVED,
          payload: {
            user: prefix as User,
            channel: params[0],
            text: params[1]
          },
          route: { serverKey, channelKey: params[0] }
        }
      : {
          type: NOTICE_FROM_USER_RECEIVED,
          payload: { user: prefix as User, text: params[1] },
          route: { serverKey, channelKey: BROADCAST_ACTIVE }
        };
  },

  PART: (serverKey, user: User, params): PartReceivedAction => ({
    type: PART_RECEIVED,
    payload: { user, channel: params[0], message: params[1] },
    route: { serverKey, channelKey: params[0] }
  }),

  PING: (serverKey, _server: Server, params): PingFromServerReceivedAction => ({
    type: PING_FROM_SERVER_RECEIVED,
    payload: { key: params.join(" ") },
    route: { serverKey, channelKey: STATUS }
  }),

  PRIVMSG: (serverKey, user: User, params): PrivmsgReceivedAction => ({
    type: PRIVMSG_RECEIVED,
    payload: { user, text: params[1] },
    route: {
      serverKey,
      channelKey: isChannel(params[0]) ? params[0] : user.nick
    }
  }),

  "004": (serverKey, _server: Server, params): ReplyMyInfoReceivedAction => {
    const [, serverName, version] = params;
    const availableUserModes = params[3].split("");
    const availableChannelModes = params[4].split("");

    return {
      type: RPL_MYINFO_RECEIVED,
      payload: {
        serverName,
        version,
        availableUserModes,
        availableChannelModes
      },
      route: { serverKey, channelKey: STATUS }
    };
  }
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
  channel: string
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("join", channel) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});

// Send NICK

// export const SEND_NICK = "MESSAGE/SEND_NICK";

// export type SendNickAction = MessageAction<typeof SEND_NICK>;

export const sendNick = (
  serverKey: string,
  nick: string
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("nick", nick) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});

// Send PART

// export const SEND_PART = "MESSAGE/SEND_PART";

// export type SendPartAction = MessageAction<typeof SEND_PART>;

export const sendPart = (
  serverKey: string,
  channel: string,
  text: string = ""
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("part", channel, text) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});

// Send PING

// export const SEND_PING_TO_SERVER = "MESSAGE/SEND_PING_TO_SERVER";

// export type SendPingToServerAction = MessageAction<typeof SEND_PING_TO_SERVER>;

export const sendPingToServer = (
  serverKey: string,
  key: string
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("ping", key) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});

// Send PONG

export const SEND_PONG_TO_SERVER = "MESSAGE/SEND_PONG_TO_SERVER";

export type SendPongToServerAction = MessageAction<
  typeof SEND_PONG_TO_SERVER,
  { key: string }
>;

export const sendPongToServerEmbedded = (
  serverKey: string,
  key: string
): SendPongToServerAction => ({
  type: SEND_PONG_TO_SERVER,
  payload: { key },
  route: { serverKey, channelKey: STATUS }
});

export const sendPongToServer = (
  serverKey: string,
  key: string
): SendRawMessageAction<SendPongToServerAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("pong", key) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: sendPongToServerEmbedded(serverKey, key)
});

// Send PRIVMSG

export const SEND_PRIVMSG = "MESSAGE/SEND_PRIVMSG";

export type SendPrivmsgAction = MessageAction<
  typeof SEND_PRIVMSG,
  { text: string }
>;

export const sendPrivmsgEmbedded = (
  serverKey: string,
  channel: string,
  text: string
): SendPrivmsgAction => ({
  type: SEND_PRIVMSG,
  payload: { text },
  route: { serverKey, channelKey: channel }
});

export const sendPrivmsg = (
  serverKey: string,
  channel: string,
  text: string
): SendRawMessageAction<SendPrivmsgAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("privmsg", channel, text) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: sendPrivmsgEmbedded(serverKey, channel, text)
});

// Send QUIT

// export const SEND_QUIT = "MESSAGE/SEND_QUIT";

// export type SendQuitAction = MessageAction<typeof SEND_QUIT>;

export const sendQuit = (
  serverKey: string,
  text: string = ""
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("quit", text) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});

// Send USER

// export const SEND_USER = "MESSAGE/SEND_USER";

// export type SendUserAction = MessageAction<typeof SEND_USER>;

export const sendUser = (
  serverKey: string,
  username: string,
  realname: string
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: getRawMessage("user", username, "0", "*", realname) },
  route: { serverKey, channelKey: BROADCAST_NONE },
  embeddedAction: undefined
});
