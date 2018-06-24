import { Action } from "redux";
import { Route } from "@app/Route";

// Update input value

export const UPDATE_INPUT_VALUE = "UI/UPDATE_INPUT_VALUE";

export interface UpdateInputValueAction
  extends Action<typeof UPDATE_INPUT_VALUE> {
  payload: { value: string };
}

export function updateInputValue(value: string): UpdateInputValueAction {
  return { type: UPDATE_INPUT_VALUE, payload: { value } };
}

// Enter input value

export const ENTER_INPUT_VALUE = "UI/ENTER_INPUT_VALUE";

export interface EnterInputValueAction
  extends Action<typeof ENTER_INPUT_VALUE> {
  payload: { value: string };
}

export function enterInputValue(value: string): EnterInputValueAction {
  return { type: ENTER_INPUT_VALUE, payload: { value } };
}

// Go back input history

export const GO_BACK_INPUT_HISTORY = "UI/GO_BACK_INPUT_HISTORY";

export interface GoBackInputHistoryAction
  extends Action<typeof GO_BACK_INPUT_HISTORY> {}

export function goBackInputHistory(): GoBackInputHistoryAction {
  return { type: GO_BACK_INPUT_HISTORY };
}

// Go forward input history

export const GO_FORWARD_INPUT_HISTORY = "UI/GO_FORWARD_INPUT_HISTORY";

export interface GoForwardInputHistoryAction
  extends Action<typeof GO_FORWARD_INPUT_HISTORY> {}

export function goForwardInputHistory(): GoForwardInputHistoryAction {
  return { type: GO_FORWARD_INPUT_HISTORY };
}

// Switch route

export const SWITCH_WINDOW = "UI/SWITCH_WINDOW";

export interface SwitchWindowAction extends Action<typeof SWITCH_WINDOW> {
  route: Route;
}

export function switchWindow(route: Route): SwitchWindowAction {
  return {
    type: SWITCH_WINDOW,
    route,
  };
}

// Close window

export const CLOSE_WINDOW = "UI/CLOSE_WINDOW";

export interface CloseWindowAction extends Action<typeof CLOSE_WINDOW> {
  route: Route;
}

export function closeWindow(route: Route): CloseWindowAction {
  return {
    type: CLOSE_WINDOW,
    route,
  };
}
