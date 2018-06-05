import { combineReducers } from "redux";
import { createSelector } from "reselect";
import input, { InputState } from "@app/state/input";
import messages, {
  MessageListState,
  getMessages,
} from "@app/state/channel/messages";

export interface ChannelState {
  messages: MessageListState;
  input: InputState;
}

export default combineReducers<ChannelState>({ messages, input });

export const getMessagesCount = createSelector(
  getMessages,
  msg => (msg ? msg.length : 0),
);
