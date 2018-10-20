import { Socket } from 'net'
import { IRC_MESSAGE_LENGTH, CRLF } from './helpers'

interface Sockets {
  [serverKey: string]: Socket
}

const sockets: Sockets = {}

export function connect(serverKey: string, host: string, port: number) {
  return new Promise<Socket>((resolve, reject) => {
    try {
      sockets[serverKey] = new Socket()
      sockets[serverKey].setKeepAlive(true, 5000)
      resolve(sockets[serverKey].connect({ host, port }))
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

export function remove(serverKey: string) {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (serverKey in sockets) {
        delete sockets[serverKey]
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}
