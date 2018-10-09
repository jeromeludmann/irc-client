import { Action } from 'redux'
import { Route, RoutedAction, BufferKey } from '@app/utils/Route'

export const CLOSE_WINDOW = 'UI/CLOSE_WINDOW'

export interface CloseWindowAction extends RoutedAction<typeof CLOSE_WINDOW> {}

export function closeWindow(route: Route): CloseWindowAction {
  return { type: CLOSE_WINDOW, route }
}

export const ENTER_INPUT_VALUE = 'UI/ENTER_INPUT_VALUE'

export interface EnterInputValueAction
  extends Action<typeof ENTER_INPUT_VALUE> {
  payload: { value: string }
}

export function enterInputValue(value: string): EnterInputValueAction {
  return { type: ENTER_INPUT_VALUE, payload: { value } }
}

export const GO_BACK_INPUT_HISTORY = 'UI/GO_BACK_INPUT_HISTORY'

export interface GoBackInputHistoryAction
  extends Action<typeof GO_BACK_INPUT_HISTORY> {}

export function goBackInputHistory(): GoBackInputHistoryAction {
  return { type: GO_BACK_INPUT_HISTORY }
}

export const GO_FORWARD_INPUT_HISTORY = 'UI/GO_FORWARD_INPUT_HISTORY'

export interface GoForwardInputHistoryAction
  extends Action<typeof GO_FORWARD_INPUT_HISTORY> {}

export function goForwardInputHistory(): GoForwardInputHistoryAction {
  return { type: GO_FORWARD_INPUT_HISTORY }
}

export const SWITCH_WINDOW = 'UI/SWITCH_WINDOW'

export type SwitchWindowAction = RoutedAction<typeof SWITCH_WINDOW>

export function switchWindow(route: Route): SwitchWindowAction {
  return {
    type: SWITCH_WINDOW,
    route,
  }
}

export const UPDATE_INPUT_VALUE = 'UI/UPDATE_INPUT_VALUE'

export interface UpdateInputValueAction
  extends Action<typeof UPDATE_INPUT_VALUE> {
  payload: { value: string }
}

export function updateInputValue(value: string): UpdateInputValueAction {
  return { type: UPDATE_INPUT_VALUE, payload: { value } }
}

// TODO put me somewhere:

export const UPDATE_SERVER_LAG = 'UI/UPDATE_SERVER_LAG'

export interface UpdateServerLagAction
  extends RoutedAction<typeof UPDATE_SERVER_LAG> {
  payload: { lag: number }
}

export function updateServerLag(
  serverKey: string,
  lag: number,
): UpdateServerLagAction {
  return {
    type: UPDATE_SERVER_LAG,
    payload: { lag },
    route: { serverKey, bufferKey: BufferKey.STATUS },
  }
}
