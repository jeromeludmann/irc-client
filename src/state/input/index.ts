import reduceHistory, {
  HistoryState,
  historyInitialState,
  HistoryAction,
} from "@app/state/input/history";
import {
  reduceValue,
  valueInitialState,
  ValueAction,
} from "@app/state/input/value";
import {
  reduceDirtyValue,
  dirtyValueInitialState,
  DirtyValueAction,
} from "@app/state/input/dirtyValue";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export type InputAction = ValueAction | DirtyValueAction | HistoryAction;

export const inputInitialState = {
  value: valueInitialState,
  dirtyValue: dirtyValueInitialState,
  history: historyInitialState,
};

export default function reduceInput(
  input: InputState = inputInitialState,
  action: InputAction,
): InputState {
  return {
    value: reduceValue(input.value, action as ValueAction, input),
    dirtyValue: reduceDirtyValue(
      input.dirtyValue,
      action as DirtyValueAction,
      input,
    ),
    history: reduceHistory(input.history, action as HistoryAction),
  };
}
