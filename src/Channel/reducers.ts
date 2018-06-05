import { combineReducers } from "redux";
import {
  CommandInputState,
  commandInputReducer,
} from "@app/CommandInput/reducers";
import { ChannelScope } from "@app/types";

// Name

type NameState = string;
const nameInitialState: NameState = "";
const nameReducer = (state = nameInitialState): NameState => state;

// Messages

type MessagesState = string[];

type MessagesPayload = ChannelScope & { value: string };

interface MessagesAction {
  type: "COMMAND_SENT";
  payload: MessagesPayload;
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
