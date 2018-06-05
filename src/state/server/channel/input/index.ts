import { combineReducers } from "redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import value, { ValueState } from "@app/state/server/channel/input/value";
import history, { HistoryState } from "@app/state/server/channel/input/history";

export interface InputState {
  value: ValueState;
  history: HistoryState;
}

export default combineReducers<InputState>({
  value,
  history,
});

export function getValue(state: RootState, { server, channel }: ChannelScope) {
  return state.servers[server].channels[channel].input.value;
}

export function updateInput(input: string, { server, channel }: ChannelScope) {
  return {
    type: "INPUT_CHANGED",
    payload: { server, channel, value: input },
  };
}

export function sendInput(input: string, { server, channel }: ChannelScope) {
  return {
    type: "INPUT_SENT",
    payload: { server, channel, value: input },
  };
}
