import { Action } from "redux";
import messages, {
  MessageListState,
  MessageListAction,
} from "@app/state/channel/messages";
import input, { InputState, InputAction } from "@app/state/input";
import unread, { UnreadState, UnreadAction } from "@app/state/channel/unread";
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

export default function reduceChannel(
  state: ChannelState,
  action: ChannelAction,
  { active }: ExtraParams,
): ChannelState {
  return {
    messages: messages(state.messages, action as MessageListAction),
    input: input(state.input, action as InputAction),
    unread: unread(state.unread, action as UnreadAction, { active }),
  };
}
