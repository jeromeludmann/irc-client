import { Reducer } from 'redux'
import { RoutedAction, isChannel, isPrivate } from '@app/utils/Route'
import { RouteState, routeInitialState, reduceRoute } from '@app/reducers/route'
import { ServerState, reduceServer } from '@app/reducers/server'
import { CLOSE_WINDOW } from '@app/actions/ui'
import { CONNECT_TO_SERVER } from '@app/actions/socket'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'

type RootPartialState = Readonly<{
  servers: Readonly<{ [key: string]: ServerState }>
}>

export type RootState = Readonly<{
  route: RouteState
}> &
  RootPartialState

type RootReducer<S = RootState> = (
  root: S,
  action: RoutedAction,
  extraStates: { root: RootState },
) => S

export const rootInitialState = {
  servers: {},
  route: routeInitialState,
}

// const routeActionToServer: RootReducer<
//   Readonly<{ [key: string]: ServerState }>
// > = (servers, action, extraStates) => {
//   const serverKeyFound =
//     action.route !== undefined && action.route.serverKey in servers

//   return serverKeyFound || action.type === CONNECT_TO_SERVER
//     ? {
//         ...servers,
//         [action.route.serverKey]: reduceServer(
//           servers[action.route.serverKey],
//           action,
//           { route: extraStates.root.route },
//         ),
//       }
//     : servers
// }

const caseReducers: CaseReducerMap<RootReducer<RootPartialState>> = {
  [CLOSE_WINDOW]: (root, action, _) => {
    const thereIsOnlyOneServer = Object.keys(root.servers).length <= 1
    const isChannelOrPrivate =
      isChannel(action.route.bufferKey) || isPrivate(action.route.bufferKey)

    if (thereIsOnlyOneServer || isChannelOrPrivate) {
      // return { servers: routeActionToServer(root.servers, action, extraStates) }
      return root
    }

    const servers = { ...root.servers }
    delete servers[action.route.serverKey]
    return { servers }
  },
}

export const reduceRoot: Reducer<RootState, RoutedAction> = (
  root = rootInitialState,
  action,
) => {
  if (action.route === undefined) {
    return root
  }

  const serverKeyFound =
    action.route !== undefined && action.route.serverKey in root.servers

  const pre = {
    servers:
      serverKeyFound || action.type === CONNECT_TO_SERVER
        ? {
            [action.route.serverKey]: reduceServer(
              root.servers[action.route.serverKey],
              action,
              { route: root.route },
            ),
          }
        : root.servers,
    route: reduceRoute(root.route, action, { root }),
  }

  return {
    ...pre,
    ...(action.type in caseReducers
      ? caseReducers[action.type](pre, action, { root })
      : {}),
  }
}
