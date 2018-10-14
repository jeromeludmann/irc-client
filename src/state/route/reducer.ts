import { Action, AnyAction } from 'redux'
import { Route, BufferKey, isStatus } from '@app/utils/Route'
import {
  SWITCH_WINDOW,
  SwitchWindowAction,
  CLOSE_WINDOW,
} from '@app/actions/ui'
import {
  ReceiveJoinAction,
  RECEIVE_JOIN,
  ReceivePartAction,
  RECEIVE_PART,
} from '@app/actions/messages/incoming'
import { RootState } from '@app/state/root/reducer'

export type RouteState = Readonly<Route>

export const routeInitialState: RouteState = {
  serverKey: 'serverKey',
  bufferKey: BufferKey.STATUS,
}

type RouteReducer = (
  state: RouteState,
  action: Action,
  extraStates: { root: RootState },
) => RouteState

const itIsMe = (action: AnyAction, extraStates: { root: RootState }) =>
  action.payload.user.nick ===
  extraStates.root.servers[action.route.serverKey].user.nick

const caseReducers: { [action: string]: RouteReducer } = {
  [CLOSE_WINDOW]: (route, _, extraStates) => {
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

  [RECEIVE_JOIN]: (route, action: ReceiveJoinAction, extraStates) =>
    itIsMe(action, extraStates) ? action.route : route,

  [RECEIVE_PART]: (route, action: ReceivePartAction, extraStates) =>
    itIsMe(action, extraStates)
      ? { ...route, bufferKey: BufferKey.STATUS }
      : route,

  [SWITCH_WINDOW]: (route, action: SwitchWindowAction, extraStates) => {
    const { serverKey, bufferKey } = action.route

    const routeFound =
      serverKey in extraStates.root.servers &&
      bufferKey in extraStates.root.servers[serverKey].buffers

    if (!routeFound) {
      console.log(`Route "${JSON.stringify(action.route)}" not found`)
      return route
    }

    return action.route
  },
}

export const reduceRoute: RouteReducer = (
  route = routeInitialState,
  action,
  extraStates,
) =>
  action.type in caseReducers
    ? caseReducers[action.type](route, action, extraStates)
    : route
