import reduceHistory, {
  HistoryState,
  HistoryAction,
  historyInitialState,
} from "@app/reducers/input-history";
import reduceValue, {
  ValueAction,
  valueInitialState,
} from "@app/reducers/input-value";
import reduceDirtyValue, {
  DirtyValueAction,
  dirtyValueInitialState,
} from "@app/reducers/input-dirty-value";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export type InputAction = ValueAction | DirtyValueAction | HistoryAction;

export const inputInitialState: InputState = {
  value: valueInitialState,
  dirtyValue: dirtyValueInitialState,
  history: historyInitialState,
};

export default (
  input = inputInitialState,
  action: InputAction,
): InputState => ({
  value: reduceValue(input.value, action as ValueAction, input),
  dirtyValue: reduceDirtyValue(
    input.dirtyValue,
    action as DirtyValueAction,
    input,
  ),
  history: reduceHistory(input.history, action as HistoryAction),
});
