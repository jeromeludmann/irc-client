import {
  HistoryState,
  historyInitialState,
  reduceHistory,
} from "@app/reducers/input/history";
import {
  inputValueInitialState,
  reduceInputValue,
} from "@app/reducers/input/value";
import {
  inputDirtyValueInitialState,
  reduceInputDirtyValue,
} from "@app/reducers/input/dirtyValue";
import { Reducer, Action } from "redux";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export const inputInitialState: InputState = {
  value: inputValueInitialState,
  dirtyValue: inputDirtyValueInitialState,
  history: historyInitialState,
};

export const reduceInput: Reducer<InputState, Action> = (
  input = inputInitialState,
  action,
) => ({
  value: reduceInputValue(input.value, action, { input }),
  dirtyValue: reduceInputDirtyValue(input.dirtyValue, action, { input }),
  history: reduceHistory(input.history, action),
});
