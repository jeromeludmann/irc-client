import {
  BufferState,
  bufferInitialState,
  reduceBuffer,
} from '@app/reducers/buffer'
import {
  BufferKey,
  RoutedAction,
  isRaw,
  isPrivate,
  isChannel,
} from '@app/utils/Route'
import { RouteState } from '@app/reducers/route'
import { CLOSE_WINDOW, CloseWindowAction } from '@app/actions/ui'
import {
  RECEIVE_JOIN,
  RECEIVE_PRIVMSG,
  RECEIVE_PART,
  ReceivePartAction,
} from '@app/actions/msgIncoming'
import { ServerState } from '@app/reducers/server'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'

export type BufferRouterState = Readonly<{
  [key: string]: BufferState
}>

type BufferRouterReducer = (
  buffers: BufferRouterState,
  action: RoutedAction,
  extraStates: { route: RouteState; server: ServerState },
) => BufferRouterState

export const bufferRouterInitialState: BufferRouterState = {
  [BufferKey.RAW]: bufferInitialState,
  [BufferKey.STATUS]: bufferInitialState,
}

const routeHandlers: { [buffer: string]: BufferRouterReducer } = {
  [BufferKey.NONE]: buffers => buffers,

  [BufferKey.ACTIVE]: (buffers, action, extraStates) => {
    const key = extraStates.route.bufferKey
    return {
      ...buffers,
      [key]: reduceBuffer(buffers[key], action, extraStates),
    }
  },

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

  Object.keys(buffers).forEach(buffer => {
    if (isChannel(buffer) || isPrivate(buffer)) {
      delete bufferMap[buffer]
    }
  })

  return bufferMap
}

const caseReducers: CaseReducerMap<BufferRouterReducer> = {
  [CLOSE_WINDOW]: (buffers, action: CloseWindowAction) =>
    isChannel(action.route.bufferKey) || isPrivate(action.route.bufferKey)
      ? removeCurrentBuffer(buffers, action.route.bufferKey)
      : removeAllServerRelatedBuffers(buffers),

  // We arbitrarily decided to close window when we "/part" the channel.
  // But later, we could make this behavior customizable.
  [RECEIVE_PART]: (buffers, action: ReceivePartAction, extraStates) => {
    const itIsMe = action.payload.user.nick === extraStates.server.user.nick

    if (itIsMe) {
      return removeCurrentBuffer(buffers, action.payload.channel)
    }

    return {
      ...buffers,
      // TODO check the route type and use appropriate reducer?
      [action.route.bufferKey]: reduceBuffer(
        buffers[action.route.bufferKey],
        action,
        extraStates,
      ),
    }
  },
}

export const reduceBufferRouter: BufferRouterReducer = (
  buffers = bufferRouterInitialState,
  action,
  extraStates,
) => {
  const { bufferKey } = action.route

  if (bufferKey in routeHandlers) {
    return routeHandlers[bufferKey](buffers, action, extraStates)
  }

  if (action.type in caseReducers) {
    return caseReducers[action.type](buffers, action, extraStates)
  }

  if (
    bufferKey in buffers ||
    [RECEIVE_PRIVMSG, RECEIVE_JOIN].indexOf(action.type) > -1
  ) {
    return {
      ...buffers,
      // TODO check the route type and use appropriate reducer?
      [bufferKey]: reduceBuffer(buffers[bufferKey], action, extraStates),
    }
  }

  return buffers
}
