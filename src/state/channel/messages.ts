import { SEND_INPUT_VALUE, SendInputValueAction } from "@app/actions/ui/input";
import { JoinAction, MESSAGE_JOIN } from "@app/actions/messages/join";
import { NoticeAction, MESSAGE_NOTICE } from "@app/actions/messages/notice";
import { PingAction, MESSAGE_PING } from "@app/actions/messages/ping";
import { PrivmsgAction, MESSAGE_PRIVMSG } from "@app/actions/messages/privmsg";

export type MessageListState = string[];

export type MessageListAction =
  | SendInputValueAction
  | JoinAction
  | NoticeAction
  | PingAction
  | PrivmsgAction;

export const messagesInitialState: MessageListState = [];

export default function reduceMessages(
  messages = messagesInitialState,
  action: MessageListAction,
): MessageListState {
  switch (action.type) {
    case SEND_INPUT_VALUE: {
      return [...messages, ">>> " + action.payload.value];
    }
    case MESSAGE_JOIN: {
      const { user, channel } = action.payload;
      const msg = `${user.nick} has joined ${channel}`;
      return [...messages, msg];
    }
    case MESSAGE_PING: {
      const { server } = action.payload;
      return [...messages, `Received ping from ${server}`];
    }
    case MESSAGE_PRIVMSG: {
      const { user, text } = action.payload;
      const msg = `${user.nick}: ${text}`;
      return [...messages, msg];
    }
    case MESSAGE_NOTICE: {
      return [...messages, action.payload.text];
    }
    default:
      return messages;
  }
}
