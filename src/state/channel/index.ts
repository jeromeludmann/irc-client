import { Action } from "redux";
import messages, {
  MessageListState,
  MessageListAction,
  messagesInitialState,
} from "@app/state/channel/messages";
import input, {
  InputState,
  InputAction,
  inputInitialState,
} from "@app/state/input";
import unread, {
  UnreadState,
  UnreadAction,
  unreadInitialState,
} from "@app/state/channel/unread";
import { ActiveState } from "@app/state/active";

export interface ChannelState {
  readonly messages: MessageListState;
  readonly input: InputState;
  readonly unread: UnreadState;
}

export type ChannelAction = Action;

interface ExtraParams {
  active: ActiveState;
}

export const channelInitialState: ChannelState = {
  messages: messagesInitialState,
  input: inputInitialState,
  unread: unreadInitialState,
};

export default function reduceChannel(
  channel = channelInitialState,
  action: ChannelAction,
  { active }: ExtraParams,
): ChannelState {
  return {
    messages: messages(channel.messages, action as MessageListAction),
    input: input(channel.input, action as InputAction),
    unread: unread(channel.unread, action as UnreadAction, { active }),
  };
}
