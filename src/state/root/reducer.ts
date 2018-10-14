import { RoutedAction, isChannel, isPrivate } from '@app/utils/Route'
import {
  RouteState,
  routeInitialState,
  reduceRoute,
} from '@app/state/route/reducer'
import {
  ServerState,
  reduceServer,
  serverInitialState,
} from '@app/state/server/reducer'
import { CLOSE_WINDOW, ADD_NEW_SERVER } from '@app/actions/ui'

type RootPartialState = Readonly<{
  servers: Readonly<{ [key: string]: ServerState }>
}>

export type RootState = {
  route: RouteState
} & RootPartialState

type RootReducer<S = RootState> = (
  root: S,
  action: RoutedAction,
  extraStates: { root: RootState },
) => S

export const rootInitialState = {
  servers: { serverKey: serverInitialState },
  route: routeInitialState,
}

const caseReducers: { [action: string]: RootReducer<RootPartialState> } = {
  [CLOSE_WINDOW]: (root, action, _) => {
    const thereIsOnlyOneServer = Object.keys(root.servers).length <= 1
    const isChannelOrPrivate =
      isChannel(action.route.bufferKey) || isPrivate(action.route.bufferKey)

    if (thereIsOnlyOneServer || isChannelOrPrivate) {
      return root
    }

    const servers = { ...root.servers }
    delete servers[action.route.serverKey]
    return { servers }
  },
}

const routeActionToServers = (
  servers: { [key: string]: ServerState },
  action: RoutedAction,
  extraStates: { route: RouteState },
) =>
  action.route.serverKey in servers || action.type === ADD_NEW_SERVER
    ? {
        ...servers,
        [action.route.serverKey]: reduceServer(
          servers[action.route.serverKey],
          action,
          extraStates,
        ),
      }
    : servers

export function reduceRoot(
  root: RootState | undefined = rootInitialState,
  action: RoutedAction,
): RootState {
  // prevent other actions to pass inside app reducers
  if (action.route === undefined) {
    return root
  }

  const intermediateState = {
    ...root,
    route: reduceRoute(root.route, action, { root }),
    servers: routeActionToServers(root.servers, action, {
      route: root.route,
    }),
  }

  return {
    ...intermediateState,
    ...(action.type in caseReducers
      ? caseReducers[action.type](intermediateState, action, {
          root: intermediateState,
        })
      : {}),
  }
}
