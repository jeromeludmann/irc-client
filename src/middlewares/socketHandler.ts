import { Socket } from 'net'
import { Middleware, Dispatch, Store, Action } from 'redux'
import {
  setConnectionEstablished,
  setConnectionClosed,
  receiveRawMessages,
  setConnectionFailed,
  lookup,
  SEND_RAW_MESSAGE,
  SendRawMessageAction,
} from '@app/actions/socket'
import { RootState } from '@app/state/root/reducer'
import {
  ConnectToServerAction,
  DisconnectFromServerAction,
  CONNECT_TO_SERVER,
  DISCONNECT_FROM_SERVER,
} from '@app/actions/socket'
import { CRLF, IRC_MESSAGE_LENGTH } from '@app/utils/helpers'
import { sendQuit } from '@app/actions/messages/outgoing'
import { ServerState } from '@app/state/server/reducer'

/**
 * Socket Middleware
 *
 * Manage connections and data sending/receiving to/from servers.
 */
export const socketHandler: Middleware = (store: Store<RootState>) => next => (
  action: Action,
) =>
  next(action.type in handlers ? handlers[action.type](action, store) : action)

const connectedSockets: {
  [serverKey: string]: { socket: Socket; buffer: string }
} = {}

const handlers: {
  [action: string]: (action: Action, store: Store<RootState>) => Action
} = {
  [CONNECT_TO_SERVER]: (
    action: ConnectToServerAction,
    { getState, dispatch },
  ): ConnectToServerAction => {
    const {
      payload: { host, port, newConnection },
      route,
    } = action

    const serverKey = newConnection
      ? generateServerKey(getState().servers)
      : route.serverKey

    if (serverKey in connectedSockets && connectedSockets[serverKey].socket) {
      connectedSockets[serverKey].socket.destroy()
    }

    connectedSockets[serverKey] = {
      socket: getSocket(dispatch)(serverKey),
      buffer: '',
    }

    connectedSockets[serverKey].socket.connect({ host, port })

    // update serverKey action by overriding it
    return { ...action, route: { ...action.route, serverKey } }
  },

  [DISCONNECT_FROM_SERVER]: (
    action: DisconnectFromServerAction,
    { dispatch },
  ): DisconnectFromServerAction => {
    const { payload, route } = action

    if (!(route.serverKey in connectedSockets)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn('disconnect: unable to find socket')
      return action
    }

    dispatch(sendQuit(route.serverKey, payload.quitMessage))
    connectedSockets[route.serverKey].socket.end()

    return action
  },

  [SEND_RAW_MESSAGE]: (
    action: SendRawMessageAction,
    { dispatch },
  ): SendRawMessageAction => {
    const {
      payload,
      route: { serverKey },
      embeddedAction,
    } = action

    if (!(serverKey in connectedSockets)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn('sendMessage: unable to find socket')
      return action
    }

    connectedSockets[serverKey].socket.write(
      payload.raw.slice(
        0,
        payload.raw.length > IRC_MESSAGE_LENGTH
          ? IRC_MESSAGE_LENGTH
          : undefined,
      ) + CRLF,
    )

    if (embeddedAction !== undefined) {
      dispatch(embeddedAction)
    }

    return action
  },
}

/**
 * Generate server key
 *
 * The returned key will be unique only if servers map are provided.
 */
export const generateServerKey = (servers?: {
  [key: string]: ServerState
}): string => {
  const key = Math.random()
    .toString(36)
    .slice(2)
  return !servers || !(key in servers) ? key : generateServerKey(servers)
}

/**
 * Get a new socket
 *
 * Create a TCP socket and add listeners that dispatches actions.
 */
const getSocket = (dispatch: Dispatch) => (serverKey: string): Socket => {
  const socket = new Socket()

  socket.on('lookup', (error, address, family, host) => {
    dispatch(lookup(serverKey, error, address, family, host))
  })

  socket.on('connect', () => {
    dispatch(setConnectionEstablished(serverKey))
  })

  socket.on('data', buffer => {
    if (!(serverKey in connectedSockets)) {
      // TODO dispatch error
      // tslint:disable-next-line
      console.warn('receive data: unable to find socket')
      return
    }

    connectedSockets[serverKey].buffer += buffer
    const messages = connectedSockets[serverKey].buffer.split(CRLF)
    connectedSockets[serverKey].buffer = messages.pop() || ''

    dispatch(receiveRawMessages(serverKey, messages))
  })

  socket.on('close', hadError => {
    delete connectedSockets[serverKey]
    dispatch(setConnectionClosed(serverKey, hadError))
  })

  socket.on('error', ({ name, message, stack }) => {
    delete connectedSockets[serverKey]
    dispatch(setConnectionFailed(serverKey, name, message, stack))
  })

  socket.on('end', () => {
    // tslint:disable-next-line
    console.warn('unhandled socket end')
  })

  socket.on('timeout', () => {
    // tslint:disable-next-line
    console.warn('unhandled socket timeout')
  })

  return socket
}
