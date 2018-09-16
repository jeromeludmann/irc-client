import { BufferKey, RoutedAction } from '@app/utils/Route'

// it seems to be useless...
type SocketAction<T> = RoutedAction<T>

// Connect to server

export const CONNECT_TO_SERVER = 'SOCKET/CONNECT_TO_SERVER'

export interface ConnectToServerAction
  extends SocketAction<typeof CONNECT_TO_SERVER> {
  payload: {
    host: string
    port: number
    newConnection: boolean
  }
}

export const connectToServer = (
  serverKey: string,
  host: string,
  port: number = 6667,
  newConnection = false,
): ConnectToServerAction => ({
  type: CONNECT_TO_SERVER,
  payload: { host, port, newConnection },
  route: { serverKey, bufferKey: BufferKey.STATUS },
})

// Disconnect from server

export const DISCONNECT_FROM_SERVER = 'SOCKET/DISCONNECT_FROM_SERVER'

export interface DisconnectFromServerAction
  extends SocketAction<typeof DISCONNECT_FROM_SERVER> {
  payload: { quitMessage?: string }
}

export const disconnectFromServer = (
  serverKey: string,
  quitMessage?: string,
): DisconnectFromServerAction => ({
  type: DISCONNECT_FROM_SERVER,
  payload: { quitMessage },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

// Send raw message to socket

export const SEND_RAW_MESSAGE = 'SOCKET/SEND_RAW_MESSAGE'

export interface SendRawMessageAction<A = void>
  extends RoutedAction<typeof SEND_RAW_MESSAGE> {
  payload: { raw: string }
  embeddedAction?: A
}

export const sendRawMessage = (
  serverKey: string,
  message: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: message },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

// Socket lookup

export const LOOKUP_SUCCESS = 'SOCKET/LOOKUP_SUCCESS'

export const LOOKUP_FAILED = 'SOCKET/LOOKUP_FAILED'

export interface LookupSuccessAction
  extends SocketAction<typeof LOOKUP_SUCCESS> {
  serverKey: string
  payload: {
    address: string
    family: string | number | null
    host: string
  }
}

export interface LookupFailedAction extends SocketAction<typeof LOOKUP_FAILED> {
  serverKey: string
  payload: { error: Error }
}

export const lookup = (
  serverKey: string,
  error: Error | null,
  address: string,
  family: string | number | null,
  host: string,
): LookupSuccessAction | LookupFailedAction => {
  return error
    ? {
        type: LOOKUP_FAILED,
        serverKey,
        payload: { error },
        route: { serverKey, bufferKey: BufferKey.STATUS },
      }
    : {
        type: LOOKUP_SUCCESS,
        serverKey,
        payload: { address, family, host },
        route: { serverKey, bufferKey: BufferKey.STATUS },
      }
}

// Receive raw messages from socket

export const RAW_MESSAGES_RECEIVED = 'SOCKET/RAW_MESSAGES_RECEIVED'

export interface RawMessagesAction
  extends SocketAction<typeof RAW_MESSAGES_RECEIVED> {
  payload: { messages: string[] }
}

export const receiveRawMessages = (
  serverKey: string,
  messages: string[],
): RawMessagesAction => ({
  type: RAW_MESSAGES_RECEIVED,
  payload: { messages },
  route: { serverKey, bufferKey: BufferKey.RAW },
})

// Socket connection established

export const CONNECTION_ESTABLISHED = 'SOCKET/CONNECTION_ESTABLISHED'

export interface ConnectionEstablishedAction
  extends SocketAction<typeof CONNECTION_ESTABLISHED> {}

export const setConnectionEstablished = (
  serverKey: string,
): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
  route: { serverKey, bufferKey: BufferKey.STATUS },
})

// Socket connection closed

export const CONNECTION_CLOSED = 'SOCKET/CONNECTION_CLOSED'

export interface ConnectionClosedAction
  extends SocketAction<typeof CONNECTION_CLOSED> {
  payload: { hadError: boolean }
}

export const setConnectionClosed = (
  serverKey: string,
  hadError: boolean,
): ConnectionClosedAction => ({
  type: CONNECTION_CLOSED,
  payload: { hadError },
  route: { serverKey, bufferKey: BufferKey.ALL },
})

// Socket connection failed

export const CONNECTION_FAILED = 'SOCKET/CONNECTION_FAILED'

export interface ConnectionFailedAction
  extends SocketAction<typeof CONNECTION_FAILED> {
  payload: {
    name: string
    message: string
    stack?: string
  }
}

export const setConnectionFailed = (
  serverKey: string,
  name: string,
  message: string,
  stack?: string,
): ConnectionFailedAction => ({
  type: CONNECTION_FAILED,
  payload: { name, message, stack },
  route: { serverKey, bufferKey: BufferKey.ALL },
})
