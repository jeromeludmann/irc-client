import { Socket } from 'net'
import { IRC_MESSAGE_LENGTH, CRLF } from './helpers'

export function connect(host: string, port: number) {
  return new Promise<Socket>((resolve, reject) => {
    try {
      const socket = new Socket()
      socket.setKeepAlive(true, 5000)
      socket.connect({ host, port })
      resolve(socket)
    } catch (error) {
      reject(error)
    }
  })
}

export function send(socket: Socket, message: string) {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const preparedMessage = message.slice(0, IRC_MESSAGE_LENGTH) + CRLF
      const sent = socket.write(preparedMessage)
      resolve(sent)
    } catch (error) {
      reject(error)
    }
  })
}

export function close(socket: Socket) {
  return new Promise<void>((resolve, reject) => {
    try {
      socket.end()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
