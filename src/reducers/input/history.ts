import {
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  EnterInputValueAction,
  ENTER_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
} from "@app/actions/ui";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";
import { mapReducer } from "@app/reducers/_map";
import { Action } from "redux";

export interface HistoryState {
  readonly values: string[];
  readonly index: number;
}

export const historyInitialState: HistoryState = {
  values: ["/connect -n localhost", "/connect localhost"], // TODO REMOVE ME
  index: 2,
};

type HistoryReducer<A = Action> = (
  input: HistoryState,
  action: A,
) => HistoryState;

const enterInputValue: HistoryReducer<EnterInputValueAction> = (
  history,
  action,
) => {
  const values = [...history.values, action.payload.value];
  return { values, index: values.length };
};

const goBackInputHistory: HistoryReducer<GoBackInputHistoryAction> = history =>
  beginOfHistory(history) ? history : { ...history, index: history.index - 1 };

const goForwardInputHistory: HistoryReducer<
  GoForwardInputHistoryAction
> = history =>
  endOfHistory(history) ? history : { ...history, index: history.index + 1 };

const map: { [action: string]: HistoryReducer } = {
  [ENTER_INPUT_VALUE]: enterInputValue,
  [GO_BACK_INPUT_HISTORY]: goBackInputHistory,
  [GO_FORWARD_INPUT_HISTORY]: goForwardInputHistory,
};

export const reduceHistory = mapReducer<HistoryState>(map);
