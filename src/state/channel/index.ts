import { combineReducers } from "redux";
import input, { InputState } from "@app/state/input";
import messages, { MessageListState } from "@app/state/channel/messages";
import unread, { UnreadState } from "@app/state/channel/unread";

export interface ChannelState {
  messages: MessageListState;
  input: InputState;
  unread: UnreadState;
  users?: any[]; // for channels only
}

export default combineReducers<ChannelState>({ messages, input, unread });
