import { Socket } from 'net'
import { eventChannel, END, Channel } from 'redux-saga'
import * as SocketActions from '@app/actions/socket'
import { IRC_MESSAGE_LENGTH, CRLF } from './helpers'
import { RoutedAction } from './Route'

interface Sockets {
  [serverKey: string]: Socket
}

const sockets: Sockets = {}

export function connect(serverKey: string, host: string, port: number) {
  return new Promise<Channel<RoutedAction>>((resolve, reject) => {
    try {
      sockets[serverKey] = new Socket()
      sockets[serverKey].setKeepAlive(true, 5000)
      sockets[serverKey].connect({ host, port })
      resolve(createSocketChannel(serverKey))
    } catch (error) {
      reject(error)
    }
  })
}

export function send(serverKey: string, message: string) {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const slicedMessage = message.slice(0, IRC_MESSAGE_LENGTH) + CRLF
      resolve(sockets[serverKey].write(slicedMessage))
    } catch (error) {
      reject(error)
    }
  })
}

export function close(serverKey: string) {
  return new Promise<void>((resolve, reject) => {
    try {
      sockets[serverKey].end()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

function createSocketChannel(serverKey: string) {
  return eventChannel<RoutedAction>(emit => {
    let buffer = ''

    sockets[serverKey].on('lookup', (error, address, family, host) => {
      emit(SocketActions.lookup(serverKey, error, address, family, host))
    })

    sockets[serverKey].on('connect', () => {
      emit(SocketActions.setConnectionEstablished(serverKey))
    })

    sockets[serverKey].on('data', data => {
      buffer += data
      const messages = buffer.split(CRLF)
      buffer = messages.pop() || ''

      emit(SocketActions.receiveRawMessages(serverKey, messages))
    })

    sockets[serverKey].on('close', hadError => {
      emit(SocketActions.setConnectionClosed(serverKey, hadError))
      emit(END)
    })

    sockets[serverKey].on('error', ({ name, message, stack }) => {
      emit(SocketActions.setConnectionFailed(serverKey, name, message, stack))
      emit(END)
    })

    sockets[serverKey].on('end', () => {
      console.warn('unhandled socket end')
    })

    sockets[serverKey].on('timeout', () => {
      console.warn('unhandled socket timeout')
    })

    return () => {
      if (serverKey in sockets) {
        console.log('end of socket channel...', serverKey)
        sockets[serverKey].end()

        console.log('>> deleting socket...', serverKey)
        delete sockets[serverKey]
        console.log('>> deleting socket OK', serverKey)
      }
    }
  })
}
