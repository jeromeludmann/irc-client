import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RAW_MESSAGES_RECEIVED,
  RawMessagesReceivedAction,
  CONNECTION_CLOSED,
  ConnectionClosedAction,
} from "@app/actions/network";
import {
  IncomingJoinAction,
  IncomingServerPingAction,
  JOIN,
  SERVER_NOTICE,
  ERROR,
  IncomingErrorAction,
  IncomingPrivmsgAction,
  PRIVMSG,
  IncomingServerNoticeAction,
  SERVER_PING,
  PART,
  IncomingPartAction,
} from "@app/actions/incoming";

export type MessageListState = string[];

export type MessageListAction =
  | ConnectionClosedAction
  | ConnectionFailedAction
  | IncomingErrorAction
  | IncomingJoinAction
  | IncomingPartAction
  | IncomingPrivmsgAction
  | IncomingServerNoticeAction
  | IncomingServerPingAction
  | RawMessagesReceivedAction;

export const messagesInitialState: MessageListState = [];

export default (
  messages = messagesInitialState,
  action: MessageListAction,
): MessageListState => {
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

    case RAW_MESSAGES_RECEIVED: {
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
