import { combineReducers } from "redux";
import {
  CommandInputState,
  commandInputReducer,
} from "@app/CommandInput/reducers";

// Name

type NameState = string;
const nameInitialState: NameState = "";
const nameReducer = (state = nameInitialState): NameState => state;

// Messages

type MessagesState = string[];

interface MessagesAction {
  type: "COMMAND_SENT";
  payload: { server: string; channel: string; value: string };
}

const messagesInitialState: MessagesState = [];

const messagesReducer = (
  state = messagesInitialState,
  { type, payload }: MessagesAction,
): MessagesState => {
  switch (type) {
    case "COMMAND_SENT":
      return [...state, payload.value];
    default:
      return state;
  }
};

export interface ChannelState {
  name: NameState;
  messages: MessagesState;
  commandInput: CommandInputState;
}

export const channelReducer = combineReducers<ChannelState>({
  name: nameReducer,
  messages: messagesReducer,
  commandInput: commandInputReducer,
});
