import { combineReducers } from "redux";
import {
  CommandInputState,
  commandInputReducer,
} from "@app/CommandInput/reducers";
import { messageListReducer, MessageListState } from "@app/MessageList/reducer";

export interface ChannelState {
  messages: MessageListState;
  commandInput: CommandInputState;
}

export const channelReducer = combineReducers<ChannelState>({
  messages: messageListReducer,
  commandInput: commandInputReducer,
});
