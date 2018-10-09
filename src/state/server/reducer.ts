import { AnyAction, Action } from 'redux'
import { RouteState } from '@app/state/route/reducer'
import {
  RoutedAction,
  BufferKey,
  isChannel,
  isPrivate,
  isRaw,
} from '@app/utils/Route'
import {
  RECEIVE_RPL_MYINFO,
  ReceiveReplyMyInfoAction,
  RECEIVE_NICK,
  ReceiveNickAction,
  RECEIVE_PART,
  ReceivePartAction,
  RECEIVE_PRIVMSG,
  RECEIVE_JOIN,
} from '@app/actions/messages/incoming'
import {
  BufferState,
  bufferInitialState,
  reduceBuffer,
} from '@app/state/buffer/reducer'
import {
  CLOSE_WINDOW,
  CloseWindowAction,
  UPDATE_SERVER_LAG,
  UpdateServerLagAction,
} from '@app/actions/ui'

export type ServerState = Readonly<{
  name: string
  user: Readonly<{
    nick: string
    user: string
    real: string
  }>
  lag: number
  modes: Readonly<{
    user: string[]
    available: Readonly<{
      channel: string[]
      user: string[]
    }>
  }>
  buffers: Readonly<{
    [key: string]: BufferState
  }>
}>

type ServerReducer<S = ServerState> = (
  server: S,
  action: Action,
  extraStates: { route: RouteState },
) => S

type BufferRouterReducer = (
  buffers: { [key: string]: BufferState },
  action: RoutedAction,
  extraStates: { route: RouteState; server: ServerState },
) => { [key: string]: BufferState }

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
  buffers: {
    [BufferKey.RAW]: bufferInitialState,
    [BufferKey.STATUS]: bufferInitialState,
  },
}

const removeCurrentBuffer = (
  buffers: { [key: string]: BufferState },
  bufferKey: string,
) => {
  const bufferMap = { ...buffers }
  delete bufferMap[bufferKey]
  return bufferMap
}

const removeAllServerRelatedBuffers = (buffers: {
  [key: string]: BufferState
}) => {
  const bufferMap = { ...buffers }

  Object.keys(bufferMap).forEach(buffer => {
    if (isChannel(buffer) || isPrivate(buffer)) {
      delete bufferMap[buffer]
    }
  })

  return bufferMap
}

const itIsMe = (server: ServerState, action: AnyAction) =>
  action.payload.user.nick === server.user.nick

const caseReducers: { [action: string]: ServerReducer } = {
  [CLOSE_WINDOW]: (server, action: CloseWindowAction) => ({
    ...server,
    buffers:
      isChannel(action.route.bufferKey) || isPrivate(action.route.bufferKey)
        ? removeCurrentBuffer(server.buffers, action.route.bufferKey)
        : removeAllServerRelatedBuffers(server.buffers),
  }),

  [RECEIVE_NICK]: (server, action: ReceiveNickAction) => ({
    ...server,
    user: itIsMe(server, action)
      ? { ...server.user, nick: action.payload.nick }
      : server.user,
  }),

  // We arbitrarily decided to close window when we "/part" the channel.
  // But later, we could make this behavior customizable.
  [RECEIVE_PART]: (server, action: ReceivePartAction) =>
    itIsMe(server, action)
      ? {
          ...server,
          buffers: removeCurrentBuffer(server.buffers, action.payload.channel),
        }
      : server,

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

  [UPDATE_SERVER_LAG]: (server, action: UpdateServerLagAction) => ({
    ...server,
    lag: action.payload.lag,
  }),
}

const broadcastHandlers: { [buffer: string]: BufferRouterReducer } = {
  // stop broadcasting
  [BufferKey.NONE]: buffers => buffers,

  // broadcast to active buffer
  [BufferKey.ACTIVE]: (buffers, action, extraStates) => {
    const key = extraStates.route.bufferKey
    return {
      ...buffers,
      [key]: reduceBuffer(buffers[key], action, extraStates),
    }
  },

  // broadcast to all buffers
  [BufferKey.ALL]: (buffers, action, extraStates) => {
    const toBroadcast: { [key: string]: BufferState } = {}

    Object.keys(buffers).forEach(key => {
      if (!isRaw(key)) {
        toBroadcast[key] = reduceBuffer(buffers[key], action, extraStates)
      }
    })

    return { ...buffers, ...toBroadcast }
  },
}

const routeActionToBuffers: BufferRouterReducer = (
  buffers,
  action,
  extraStates,
) => {
  if (action.route.bufferKey in broadcastHandlers) {
    return broadcastHandlers[action.route.bufferKey](
      buffers,
      action,
      extraStates,
    )
  }

  if (
    action.route.bufferKey in buffers ||
    [RECEIVE_PRIVMSG, RECEIVE_JOIN].indexOf(action.type) > -1
  ) {
    return {
      ...buffers,
      [action.route.bufferKey]: reduceBuffer(
        buffers[action.route.bufferKey],
        action,
        extraStates,
      ),
    }
  }

  return buffers
}

export const reduceServer: ServerReducer = (
  server = serverInitialState,
  action,
  extraStates,
) => {
  const intermediateState = {
    ...server,
    buffers: routeActionToBuffers(server.buffers, action as RoutedAction, {
      ...extraStates,
      server,
    }),
  }

  return {
    ...intermediateState,
    ...(action.type in caseReducers
      ? caseReducers[action.type](intermediateState, action, extraStates)
      : {}),
  }
}
