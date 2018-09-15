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
} from '@app/Route'
import { RouteState } from '@app/reducers/route'
import { CLOSE_WINDOW, CloseWindowAction } from '@app/actions/ui'
import { RECEIVE_JOIN, RECEIVE_PRIVMSG } from '@app/actions/msgIncoming'
import { ServerState } from '@app/reducers/server'

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

const handlers: { [action: string]: BufferRouterReducer } = {
  [CLOSE_WINDOW]: (buffers, action: CloseWindowAction) => {
    const updatedBuffers = { ...buffers }

    if (
      isChannel(action.route.bufferKey) ||
      isPrivate(action.route.bufferKey)
    ) {
      delete updatedBuffers[action.route.bufferKey]
      return updatedBuffers
    }

    // Remove all server-related buffers while closing status window
    Object.keys(buffers).forEach(buffer => {
      if (isChannel(buffer) || isPrivate(buffer)) {
        delete updatedBuffers[buffer]
      }
    })

    return updatedBuffers
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

  if (action.type in handlers) {
    return handlers[action.type](buffers, action, extraStates)
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
