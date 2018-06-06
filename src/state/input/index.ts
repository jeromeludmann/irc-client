import { combineReducers } from "redux";
import { ChannelScope } from "@app/types";
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
  { server, channel }: ChannelScope,
): ValueState {
  return state.servers[server].channels[channel].input.value;
}
