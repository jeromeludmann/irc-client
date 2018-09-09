import { ServerState, reduceServer } from '@app/reducers/server'
import { RoutedAction, isChannel, isPrivate } from '@app/Route'
import { RouteState } from '@app/reducers/route'
import { CLOSE_WINDOW } from '@app/actions/ui'
import { LOOKUP_SUCCESS, LOOKUP_FAILED } from '@app/actions/socket'

export type ServerRouterState = Readonly<{
  [key: string]: ServerState
}>

type ServerRouterReducer = (
  servers: ServerRouterState,
  action: RoutedAction,
  extraStates: { route: RouteState },
) => ServerRouterState

export const serverRouterInitialState = {}

const routeAction: ServerRouterReducer = (servers, action, extraStates) => ({
  ...servers,
  [action.route.serverKey]: reduceServer(
    servers[action.route.serverKey],
    action,
    extraStates,
  ),
})

const handlers: { [action: string]: ServerRouterReducer } = {
  [CLOSE_WINDOW]: (servers, action, extraStates) => {
    const thereIsOnlyOneServer = Object.keys(servers).length <= 1
    const isChannelOrPrivate =
      isChannel(action.route.bufferKey) || isPrivate(action.route.bufferKey)

    if (thereIsOnlyOneServer || isChannelOrPrivate) {
      return routeAction(servers, action, extraStates)
    }

    const updatedServers = { ...servers }
    delete updatedServers[action.route.serverKey]
    return updatedServers
  },
}

export const reduceServerRouter: ServerRouterReducer = (
  servers = serverRouterInitialState,
  action,
  extraStates,
) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](servers, action, extraStates)
  }

  const serverKeyFound =
    action.route !== undefined && servers.hasOwnProperty(action.route.serverKey)

  if (
    serverKeyFound ||
    [LOOKUP_SUCCESS, LOOKUP_FAILED].indexOf(action.type) > -1
  ) {
    return routeAction(servers, action, extraStates)
  }

  return servers
}
