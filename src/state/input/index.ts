import { combineReducers } from "redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import value, { ValueState } from "@app/state/input/value";
import history, { HistoryState } from "@app/state/input/history";

export interface InputState {
  value: ValueState;
  history: HistoryState;
}

export const InputTypes = {
  CHANGE: "INPUT/CHANGE",
  SEND: "INPUT/SEND",
};

export interface ChangeInputAction {
  type: typeof InputTypes.CHANGE;
  scope: ChannelScope;
  payload: { value: string };
}

export interface SendInputAction {
  type: typeof InputTypes.SEND;
  scope: ChannelScope;
  payload: { value: string };
}

export default combineReducers<InputState>({ value, history });

export function getValue(
  state: RootState,
  { server, channel }: ChannelScope,
): ValueState {
  return state.servers[server].channels[channel].input.value;
}

export function changeInput(scope: ChannelScope, input: string) {
  return {
    type: InputTypes.CHANGE,
    scope,
    payload: { value: input },
  };
}

export function sendInput(scope: ChannelScope, input: string) {
  return {
    type: InputTypes.SEND,
    scope,
    payload: { value: input },
  };
}
