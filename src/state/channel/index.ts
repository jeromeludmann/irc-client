import { combineReducers } from "redux";
import messages, { MessageListState } from "@app/state/channel/messages";
import unread, { UnreadState } from "@app/state/channel/unread";
import input, { InputState } from "@app/state/input/input";

export interface ChannelState {
  readonly messages: MessageListState;
  readonly input: InputState;
  readonly unread: UnreadState;
}

export default combineReducers<ChannelState>({ messages, input, unread });
