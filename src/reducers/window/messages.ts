import { JoinAction, MESSAGE_JOIN } from "@app/actions/messages/join";
import {
  ServerNoticeAction,
  MESSAGE_SERVER_NOTICE,
} from "@app/actions/messages/notice";
import {
  ServerPingAction,
  MESSAGE_SERVER_PING,
} from "@app/actions/messages/ping";
import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RAW_MESSAGES_RECEIVED,
  RawMessagesReceivedAction,
} from "@app/actions/socket";
import {
  ChannelPrivmsgAction,
  UserPrivmsgAction,
  MESSAGE_CHANNEL_PRIVMSG,
  MESSAGE_USER_PRIVMSG,
} from "@app/actions/messages/privmsg";

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
    case MESSAGE_JOIN: {
      const { user, channel } = action.payload;
      const msg = `${user.nick} has joined ${channel}`;
      return [...messages, msg];
    }
    case MESSAGE_SERVER_PING: {
      return [...messages, "Ping? (Pong!)"];
    }
    case MESSAGE_CHANNEL_PRIVMSG:
    case MESSAGE_USER_PRIVMSG: {
      const { user, text } = action.payload;
      const msg = `${user.nick}: ${text}`;
      return [...messages, msg];
    }
    case MESSAGE_SERVER_NOTICE: {
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
