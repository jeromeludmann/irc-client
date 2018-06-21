import { Action } from "redux";

// Update value

export const UPDATE_INPUT_VALUE = "UI/UPDATE_INPUT_VALUE";

export interface UpdateInputValueAction
  extends Action<typeof UPDATE_INPUT_VALUE> {
  payload: { value: string };
}

export function updateInputValue(value: string): UpdateInputValueAction {
  return { type: UPDATE_INPUT_VALUE, payload: { value } };
}

// Enter value

export const ENTER_INPUT_VALUE = "UI/ENTER_INPUT_VALUE";

export interface EnterInputValueAction
  extends Action<typeof ENTER_INPUT_VALUE> {
  payload: { value: string };
}

export function enterInputValue(value: string): EnterInputValueAction {
  return { type: ENTER_INPUT_VALUE, payload: { value } };
}

// Go back history

export const GO_BACK_INPUT_HISTORY = "UI/GO_BACK_INPUT_HISTORY";

export interface GoBackInputHistoryAction
  extends Action<typeof GO_BACK_INPUT_HISTORY> {}

export function goBackInputHistory(): GoBackInputHistoryAction {
  return { type: GO_BACK_INPUT_HISTORY };
}

// Go forward history

export const GO_FORWARD_INPUT_HISTORY = "UI/GO_FORWARD_INPUT_HISTORY";

export interface GoForwardInputHistoryAction
  extends Action<typeof GO_FORWARD_INPUT_HISTORY> {}

export function goForwardInputHistory(): GoForwardInputHistoryAction {
  return { type: GO_FORWARD_INPUT_HISTORY };
}
