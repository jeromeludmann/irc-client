import { Action } from "redux";

export const CHANGE_INPUT_VALUE = "UI/CHANGE_INPUT_VALUE";
export const SEND_INPUT_VALUE = "UI/SEND_INPUT_VALUE";
export const GO_BACK_INPUT_HISTORY = "UI/GO_BACK_INPUT_HISTORY";
export const GO_FORWARD_INPUT_HISTORY = "UI/GO_FORWARD_INPUT_HISTORY";

export interface ChangeInputValueAction
  extends Action<typeof CHANGE_INPUT_VALUE> {
  payload: { value: string };
}

export interface SendInputValueAction extends Action<typeof SEND_INPUT_VALUE> {
  payload: { value: string };
}

export interface GoBackInputHistoryAction
  extends Action<typeof GO_BACK_INPUT_HISTORY> {}

export interface GoForwardInputHistoryAction
  extends Action<typeof GO_FORWARD_INPUT_HISTORY> {}

export function changeInputValue(value: string): ChangeInputValueAction {
  return { type: CHANGE_INPUT_VALUE, payload: { value } };
}

export function sendInputValue(value: string): SendInputValueAction {
  return { type: SEND_INPUT_VALUE, payload: { value } };
}

export function goBackInputHistory(): GoBackInputHistoryAction {
  return { type: GO_BACK_INPUT_HISTORY };
}

export function goForwardInputHistory(): GoForwardInputHistoryAction {
  return { type: GO_FORWARD_INPUT_HISTORY };
}
