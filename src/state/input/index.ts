import { combineReducers } from "redux";
import { RootState } from "@app/state";
import value, { ValueState } from "@app/state/input/value";
import history, { HistoryState } from "@app/state/input/history";

export interface InputState {
  value: ValueState;
  history: HistoryState;
}

export default combineReducers<InputState>({ value, history });

export function getValue(
  state: RootState,
  server: string,
  channel: string,
): ValueState {
  return state.servers[server].channels[channel].input.value;
}
