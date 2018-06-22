import reduceHistory, {
  HistoryState,
  HistoryAction,
  historyInitialState,
} from "@app/reducers/input/history";
import reduceValue, {
  ValueAction,
  valueInitialState,
} from "@app/reducers/input/value";
import reduceDirtyValue, {
  DirtyAction,
  dirtyInitialState,
} from "@app/reducers/input/dirty";

export interface InputState {
  readonly value: string;
  readonly dirtyValue: string;
  readonly history: HistoryState;
}

export type InputAction = ValueAction | DirtyAction | HistoryAction;

export const inputInitialState: InputState = {
  value: valueInitialState,
  dirtyValue: dirtyInitialState,
  history: historyInitialState,
};

export default (
  input = inputInitialState,
  action: InputAction,
): InputState => ({
  value: reduceValue(input.value, action as ValueAction, input),
  dirtyValue: reduceDirtyValue(
    input.dirtyValue,
    action as DirtyAction,
    input,
  ),
  history: reduceHistory(input.history, action as HistoryAction),
});
