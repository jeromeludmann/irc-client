import { combineReducers } from "redux";

// Value

type ValueState = string;

type ValueAction =
  | {
      type: "COMMAND_CHANGED";
      payload: { value: string };
    }
  | {
      type: "COMMAND_SENT";
      payload: {};
    };

const valueInitialState: ValueState = "";

const value = (state = valueInitialState, action: ValueAction): ValueState => {
  switch (action.type) {
    case "COMMAND_CHANGED":
      return action.payload.value;
    case "COMMAND_SENT":
      return "";
    default:
      return state;
  }
};

// History

type HistoryState = string[];
const historyInitialState: HistoryState = [];
const history = (state = historyInitialState): HistoryState => state;

// CommandInput

export type CommandInputState = {
  value: ValueState;
  history: HistoryState;
};

export const commandInputReducer = combineReducers<CommandInputState>({
  value,
  history,
});
