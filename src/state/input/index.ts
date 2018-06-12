import reduceHistory, {
  HistoryState,
  HistoryAction,
} from "@app/state/input/history";
import { reduceValue, ValueAction } from "@app/state/input/value";
import {
  reduceDirtyValue,
  DirtyValueAction,
} from "@app/state/input/dirtyValue";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export type InputAction = ValueAction | DirtyValueAction | HistoryAction;

export default function reduceInput(
  input: InputState,
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
