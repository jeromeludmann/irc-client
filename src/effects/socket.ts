import { Socket, SocketConnectOpts } from 'net'
import { call } from 'redux-saga/effects'
import { IRC_MESSAGE_LENGTH, CRLF } from '@app/utils/helpers'

interface SocketMap {
  [serverKey: string]: Socket
}

const socketMap: SocketMap = {}

export function* connect(serverKey: string, host: string, port: number) {
  const socket: Socket = yield* get(serverKey)
  return yield call(
    (options: SocketConnectOpts) => Promise.resolve(socket.connect(options)),
    { host, port },
  )
}

export function* send(serverKey: string, message: string) {
  const socket: Socket = yield* get(serverKey)
  yield call(
    str => Promise.resolve(socket.write(str)),
    message.slice(0, IRC_MESSAGE_LENGTH) + CRLF,
  )
}

export function* end(serverKey: string) {
  const socket: Socket = yield* get(serverKey)
  yield call(() => Promise.resolve(socket.end()))
}

export function* get(serverKey: string) {
  const sockets: SocketMap = yield call(() => Promise.resolve(socketMap))

  return serverKey in sockets
    ? yield call(() => Promise.resolve(sockets[serverKey]))
    : yield call(() => {
        sockets[serverKey] = new Socket()
        sockets[serverKey].setKeepAlive(true, 5000)
        return Promise.resolve(sockets[serverKey])
      })
}

export function* remove(serverKey: string) {
  const sockets: SocketMap = yield call(() => Promise.resolve(socketMap))

  if (serverKey in sockets) {
    yield call(() => {
      delete sockets[serverKey]
      return Promise.resolve()
    })
  }
}
