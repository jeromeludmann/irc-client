import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RAW_MESSAGES_RECEIVED,
  RawMessagesReceivedAction,
} from "@app/actions/network";
import {
  JoinAction,
  ServerNoticeAction,
  ServerPingAction,
  ChannelPrivmsgAction,
  UserPrivmsgAction,
  JOIN,
  SERVER_PING,
  CHANNEL_PRIVMSG,
  USER_PRIVMSG,
  SERVER_NOTICE,
} from "@app/actions/message-in";

export type MessageListState = string[];

export type MessageListAction =
  | JoinAction
  | ServerNoticeAction
  | ServerPingAction
  | ChannelPrivmsgAction
  | UserPrivmsgAction
  | ConnectionFailedAction
  | RawMessagesReceivedAction;

export const messagesInitialState: MessageListState = [];

export default (
  messages = messagesInitialState,
  action: MessageListAction,
): MessageListState => {
  switch (action.type) {
    case JOIN: {
      const { user, channel } = action.payload;
      const msg = `${user.nick} has joined ${channel}`;
      return [...messages, msg];
    }
    case SERVER_PING: {
      return [...messages, "Ping? (Pong!)"];
    }
    case CHANNEL_PRIVMSG:
    case USER_PRIVMSG: {
      const { user, text } = action.payload;
      const msg = `${user.nick}: ${text}`;
      return [...messages, msg];
    }
    case SERVER_NOTICE: {
      return [...messages, action.payload.text];
    }
    case CONNECTION_FAILED: {
      return [...messages, action.payload.message];
    }
    case RAW_MESSAGES_RECEIVED: {
      return [...messages, ...action.payload.messages];
    }
    default:
      return messages;
  }
};
