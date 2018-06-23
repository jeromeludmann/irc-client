import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RAW_MESSAGES,
  ReceiveRawMessagesAction,
  CONNECTION_CLOSED,
  ConnectionClosedAction,
} from "@app/actions/network";
import {
  JoinAction,
  ServerPingAction,
  JOIN,
  SERVER_NOTICE,
  ERROR,
  ErrorAction,
  PrivmsgAction,
  PRIVMSG,
  ServerNoticeAction,
  SERVER_PING,
  PART,
  PartAction,
} from "@app/actions/incoming";

export type MessagesState = string[];

export type MessagesAction =
  | ConnectionClosedAction
  | ConnectionFailedAction
  | ErrorAction
  | JoinAction
  | PartAction
  | PrivmsgAction
  | ServerNoticeAction
  | ServerPingAction
  | ReceiveRawMessagesAction;

export const messagesInitialState: MessagesState = [];

export const reduceMessages = (
  messages = messagesInitialState,
  action: MessagesAction,
): MessagesState => {
  switch (action.type) {
    case CONNECTION_FAILED: {
      return [...messages, action.payload.message];
    }

    case CONNECTION_CLOSED: {
      return [...messages, "Disconnected from remote host."];
    }

    case ERROR: {
      return [...messages, action.payload.message];
    }

    case JOIN: {
      const { user, channel } = action.payload;
      const msg = `${user.nick} has joined ${channel}`;
      return [...messages, msg];
    }

    case PART: {
      const { user, channel, message } = action.payload;
      const baseMsg = `${user.nick} has left ${channel}`;
      const msg = message ? `${baseMsg} (${message})` : baseMsg;
      return [...messages, msg];
    }

    case PRIVMSG: {
      const { user, text } = action.payload;
      const msg = `${user.nick}: ${text}`;
      return [...messages, msg];
    }

    case RAW_MESSAGES: {
      return [...messages, ...action.payload.messages];
    }

    case SERVER_NOTICE: {
      return [...messages, action.payload.text];
    }

    case SERVER_PING: {
      return [...messages, "Ping?"];
    }

    default:
      return messages;
  }
};
