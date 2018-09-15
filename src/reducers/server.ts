import { RouteState } from '@app/reducers/route'
import {
  BufferRouterState,
  bufferRouterInitialState,
  reduceBufferRouter,
} from '@app/reducers/bufferRouter'
import { RoutedAction } from '@app/Route'
import {
  RECEIVE_RPL_MYINFO,
  ReceiveReplyMyInfoAction,
  RECEIVE_NICK,
  ReceiveNickAction,
  RECEIVE_PONG_FROM_SERVER,
  ReceivePongFromServerAction,
} from '@app/actions/msgIncoming'

type ServerPartialState = Readonly<{
  name: string
  user: Readonly<{
    nick: string
    user: string
    real: string
  }>
  lag: number
  // TODO refactor to another nested reducer
  modes: Readonly<{
    user: string[]
    available: Readonly<{
      channel: string[]
      user: string[]
    }>
  }>
}>

export type ServerState = Readonly<{
  buffers: BufferRouterState
}> &
  ServerPartialState

type ServerReducer<S = ServerState> = (
  server: S,
  action: RoutedAction,
  extraStates: { route: RouteState },
) => S

export const serverInitialState = {
  name: '<unknown>',
  user: {
    nick: 'default_nick',
    user: 'default_user',
    real: 'default_name',
  },
  lag: 0,
  modes: {
    user: [],
    available: { channel: [], user: [] },
  },
  buffers: bufferRouterInitialState,
}

const handlers: { [action: string]: ServerReducer<ServerPartialState> } = {
  [RECEIVE_NICK]: (server, action: ReceiveNickAction) => ({
    ...server,
    user:
      action.payload.user.nick === server.user.nick
        ? { ...server.user, nick: action.payload.nick }
        : server.user,
  }),

  [RECEIVE_PONG_FROM_SERVER]: (
    server,
    action: ReceivePongFromServerAction,
  ) => ({
    ...server,
    lag: action.payload.lag,
  }),

  [RECEIVE_RPL_MYINFO]: (server, action: ReceiveReplyMyInfoAction) => ({
    ...server,
    name: action.payload.serverName,
    modes: {
      ...server.modes,
      available: {
        channel: action.payload.availableChannelModes,
        user: action.payload.availableUserModes,
      },
    },
  }),
}

export const reduceServer: ServerReducer = (
  server = serverInitialState,
  action,
  extraStates,
) => ({
  ...(action.type in handlers
    ? handlers[action.type](server, action, extraStates)
    : server),
  buffers: reduceBufferRouter(server.buffers, action as RoutedAction, {
    ...extraStates,
    server,
  }),
})
