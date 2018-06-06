import { ChannelScope } from "@app/types";

export const InputActionTypes = {
  CHANGED: "INPUT/CHANGED",
  SENT: "INPUT/SENT",
};

export interface InputChangedAction {
  type: typeof InputActionTypes.CHANGED;
  scope: ChannelScope;
  payload: { value: string };
}

export interface InputSentAction {
  type: typeof InputActionTypes.SENT;
  scope: ChannelScope;
  payload: { value: string };
}

export function changeInput(scope: ChannelScope, input: string) {
  return {
    type: InputActionTypes.CHANGED,
    scope,
    payload: { value: input },
  };
}

export function sendInput(scope: ChannelScope, input: string) {
  return {
    type: InputActionTypes.SENT,
    scope,
    payload: { value: input },
  };
}
