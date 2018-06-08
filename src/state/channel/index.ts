import { combineReducers } from "redux";
import messages, { MessageListState } from "@app/state/channel/messages";
import unread, { UnreadState } from "@app/state/channel/unread";
import input, { InputState } from "@app/state/input/input";

export interface ChannelState {
  messages: MessageListState;
  input: InputState;
  unread: UnreadState;
}

export default combineReducers<ChannelState>({ messages, input, unread });
