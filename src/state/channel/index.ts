import { combineReducers } from "redux";
import input, { InputState } from "@app/state/input";
import messages, { MessageListState } from "@app/state/channel/messages";

export interface ChannelState {
  messages: MessageListState;
  input: InputState;
}

export default combineReducers<ChannelState>({ messages, input });
