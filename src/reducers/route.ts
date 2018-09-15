import { Action } from 'redux'
import { Route, BufferKey, isStatus } from '@app/Route'
import {
  SWITCH_WINDOW,
  SwitchWindowAction,
  CLOSE_WINDOW,
  CloseWindowAction,
} from '@app/actions/ui'
import { ReceiveJoinAction, RECEIVE_JOIN } from '@app/actions/msgIncoming'
import { RootState } from '@app/reducers'

export type RouteState = Readonly<Route>

export const routeInitialState: RouteState = {
  serverKey: '',
  bufferKey: BufferKey.STATUS,
}

type RouteReducer = (
  state: RouteState,
  action: Action,
  extraStates: { root: RootState },
) => RouteState

const caseReducers: { [action: string]: RouteReducer } = {
  [RECEIVE_JOIN]: (route, action: ReceiveJoinAction, extraStates) =>
    action.payload.user.nick ===
    extraStates.root.servers[action.route.serverKey].user.nick
      ? action.route
      : route,

  [CLOSE_WINDOW]: (route, _: CloseWindowAction, extraStates) => {
    if (isStatus(route.bufferKey)) {
      const keys = Object.keys(extraStates.root.servers)
      return keys.length > 1
        ? {
            serverKey: keys.filter(key => key !== route.serverKey)[0],
            bufferKey: BufferKey.STATUS,
          }
        : route
    }

    return { ...route, bufferKey: BufferKey.STATUS }
  },

  // TODO use extraStates and check if the given route exists
  [SWITCH_WINDOW]: (_, action: SwitchWindowAction) => action.route,
}

export const reduceRoute: RouteReducer = (
  routeState = routeInitialState,
  action,
  extraStates,
) =>
  action.type in caseReducers
    ? caseReducers[action.type](routeState, action, extraStates)
    : routeState
