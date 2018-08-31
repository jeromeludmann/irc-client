import {
  EnterInputValueAction,
  ENTER_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
} from "@app/actions/ui";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";
import { Reducer, Action } from "redux";

export interface HistoryState {
  readonly values: string[];
  readonly index: number;
}

export const historyInitialState: HistoryState = {
  values: ["/connect -n localhost", "/connect localhost"], // TODO REMOVE ME
  index: 2,
};

const handlers: { [action: string]: Reducer } = {
  [ENTER_INPUT_VALUE]: (history, action: EnterInputValueAction) => {
    const values = [...history.values, action.payload.value];
    return { values, index: values.length };
  },

  [GO_BACK_INPUT_HISTORY]: history =>
    beginOfHistory(history)
      ? history
      : { ...history, index: history.index - 1 },

  [GO_FORWARD_INPUT_HISTORY]: history =>
    endOfHistory(history) ? history : { ...history, index: history.index + 1 },
};

export const reduceHistory = (
  historyState = historyInitialState,
  action: Action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](historyState, action)
    : historyState;
