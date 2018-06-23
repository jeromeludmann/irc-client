import {
  HistoryState,
  HistoryAction,
  historyInitialState,
  reduceHistory,
} from "@app/reducers/input/history";
import {
  InputValueAction,
  inputValueInitialState,
  reduceInputValue,
} from "@app/reducers/input/value";
import {
  InputDirtyValueAction,
  inputDirtyValueInitialState,
  reduceInputDirtyValue,
} from "@app/reducers/input/dirtyValue";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export type InputAction = InputValueAction | InputDirtyValueAction | HistoryAction;

export const inputInitialState: InputState = {
  value: inputValueInitialState,
  dirtyValue: inputDirtyValueInitialState,
  history: historyInitialState,
};

export const reduceInput = (
  input = inputInitialState,
  action: InputAction,
): InputState => ({
  value: reduceInputValue(input, action as InputValueAction),
  dirtyValue: reduceInputDirtyValue(input, action as InputDirtyValueAction),
  history: reduceHistory(input.history, action as HistoryAction),
});
