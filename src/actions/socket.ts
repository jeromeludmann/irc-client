import { BufferKey, RoutedAction } from '@app/utils/Route'

export const CONNECT_TO_SERVER = 'SOCKET/CONNECT_TO_SERVER'

export interface ConnectToServerAction
  extends RoutedAction<typeof CONNECT_TO_SERVER> {
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

export const DISCONNECT_FROM_SERVER = 'SOCKET/DISCONNECT_FROM_SERVER'

export interface DisconnectFromServerAction
  extends RoutedAction<typeof DISCONNECT_FROM_SERVER> {
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

export const LOOKUP_SUCCESS = 'SOCKET/LOOKUP_SUCCESS'

export const LOOKUP_FAILED = 'SOCKET/LOOKUP_FAILED'

export interface LookupSuccessAction
  extends RoutedAction<typeof LOOKUP_SUCCESS> {
  serverKey: string
  payload: {
    address: string
    family: string | number | null
    host: string
  }
}

export interface LookupFailedAction extends RoutedAction<typeof LOOKUP_FAILED> {
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

export const RAW_MESSAGES_RECEIVED = 'SOCKET/RAW_MESSAGES_RECEIVED'

export interface RawMessagesAction
  extends RoutedAction<typeof RAW_MESSAGES_RECEIVED> {
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

export const CONNECTION_ESTABLISHED = 'SOCKET/CONNECTION_ESTABLISHED'

export interface ConnectionEstablishedAction
  extends RoutedAction<typeof CONNECTION_ESTABLISHED> {}

export const setConnectionEstablished = (
  serverKey: string,
): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
  route: { serverKey, bufferKey: BufferKey.STATUS },
})

export const CONNECTION_CLOSED = 'SOCKET/CONNECTION_CLOSED'

export interface ConnectionClosedAction
  extends RoutedAction<typeof CONNECTION_CLOSED> {
  payload: { hadError: boolean }
}

export const setConnectionClosed = (
  serverKey: string,
  hadError = false,
): ConnectionClosedAction => ({
  type: CONNECTION_CLOSED,
  payload: { hadError },
  route: { serverKey, bufferKey: BufferKey.ALL },
})

export const CONNECTION_FAILED = 'SOCKET/CONNECTION_FAILED'

export interface ConnectionFailedAction
  extends RoutedAction<typeof CONNECTION_FAILED> {
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
