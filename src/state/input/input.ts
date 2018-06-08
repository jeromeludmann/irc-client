import { combineReducers } from "redux";
import reduceValue, { ValueState } from "@app/state/input/value";
import reduceHistory, { HistoryState } from "@app/state/input/history";
import reduceDirtyValue, { DirtyValueState } from "@app/state/input/dirtyValue";

export interface InputState {
  readonly value: ValueState;
  readonly dirtyValue: DirtyValueState;
  readonly history: HistoryState;
}

export default combineReducers<InputState>({
  value: reduceValue,
  dirtyValue: reduceDirtyValue,
  history: reduceHistory,
});
