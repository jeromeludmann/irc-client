import { combineReducers } from "redux";
import { Scope } from "@app/types";
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
  { server, channel }: Scope,
): ValueState {
  return channel
    ? state.servers[server].channels[channel].input.value
    : state.servers[server].status.input.value;
}
