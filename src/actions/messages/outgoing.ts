import { RoutedAction, BufferKey } from '@app/utils/Route'

export const SEND_MESSAGE = 'MESSAGE/SEND_MESSAGE'

export interface SendMessageAction<T = string, P = {}> extends RoutedAction<T> {
  group: typeof SEND_MESSAGE
  payload: { raw: string } & P
}

export const SEND_JOIN = 'MESSAGE/SEND_JOIN'

export type SendJoinAction = SendMessageAction<
  typeof SEND_JOIN,
  { channel: string }
>

export function sendJoin(serverKey: string, channel: string): SendJoinAction {
  return {
    type: SEND_JOIN,
    group: SEND_MESSAGE,
    payload: { channel, raw: raw('join', channel) },
    route: { serverKey, bufferKey: BufferKey.NONE },
  }
}

export const SEND_NICK = 'MESSAGE/SEND_NICK'

export type SendNickAction = SendMessageAction<
  typeof SEND_NICK,
  { nick: string }
>

export function sendNick(serverKey: string, nick: string): SendNickAction {
  return {
    type: SEND_NICK,
    group: SEND_MESSAGE,
    payload: { nick, raw: raw('nick', nick) },
    route: { serverKey, bufferKey: BufferKey.NONE },
  }
}

export const SEND_PART = 'MESSAGE/SEND_PART'

export type SendPartAction = SendMessageAction<
  typeof SEND_PART,
  { channel: string; text: string }
>

export function sendPart(
  serverKey: string,
  channel: string,
  text: string = '',
): SendPartAction {
  return {
    type: SEND_PART,
    group: SEND_MESSAGE,
    payload: { channel, text, raw: raw('part', channel, text) },
    route: { serverKey, bufferKey: BufferKey.NONE },
  }
}

export const SEND_PING_TO_SERVER = 'MESSAGE/SEND_PING_TO_SERVER'

export type SendPingToServerAction = SendMessageAction<
  typeof SEND_PING_TO_SERVER,
  { key: number }
>

export function sendPingToServer(
  serverKey: string,
  key = Date.now(),
): SendPingToServerAction {
  return {
    type: SEND_PING_TO_SERVER,
    group: SEND_MESSAGE,
    payload: { key, raw: raw('ping', key.toString()) },
    route: { serverKey, bufferKey: BufferKey.STATUS },
  }
}

export const SEND_PONG_TO_SERVER = 'MESSAGE/SEND_PONG_TO_SERVER'

export type SendPongToServerAction = SendMessageAction<
  typeof SEND_PONG_TO_SERVER,
  { key: string }
>

export function sendPongToServer(
  serverKey: string,
  key: string,
): SendPongToServerAction {
  return {
    type: SEND_PONG_TO_SERVER,
    group: SEND_MESSAGE,
    payload: { key, raw: raw('pong', key) },
    route: { serverKey, bufferKey: BufferKey.STATUS },
  }
}

export const SEND_PRIVMSG = 'MESSAGE/SEND_PRIVMSG'

export type SendPrivmsgAction = SendMessageAction<
  typeof SEND_PRIVMSG,
  { channel: string; text: string }
>

export function sendPrivmsg(
  serverKey: string,
  channel: string,
  text: string,
): SendPrivmsgAction {
  return {
    type: SEND_PRIVMSG,
    group: SEND_MESSAGE,
    payload: { channel, text, raw: raw('privmsg', channel, text) },
    route: { serverKey, bufferKey: channel },
  }
}

export const SEND_QUIT = 'MESSAGE/SEND_QUIT'

export type SendQuitAction = SendMessageAction<
  typeof SEND_QUIT,
  { text: string }
>

export function sendQuit(serverKey: string, text: string = ''): SendQuitAction {
  return {
    type: SEND_QUIT,
    group: SEND_MESSAGE,
    payload: { text, raw: raw('quit', text) },
    route: { serverKey, bufferKey: BufferKey.NONE },
  }
}

export const SEND_USER = 'MESSAGE/SEND_USER'

export type SendUserAction = SendMessageAction<
  typeof SEND_USER,
  { username: string; realname: string }
>

export function sendUser(
  serverKey: string,
  username: string,
  realname: string,
): SendUserAction {
  return {
    type: SEND_USER,
    group: SEND_MESSAGE,
    payload: {
      username,
      realname,
      raw: raw('user', username, '0', '*', realname),
    },
    route: { serverKey, bufferKey: BufferKey.NONE },
  }
}

function raw(command: string, ...params: string[]) {
  const last = params.length - 1

  if (params[last].indexOf(' ') > -1 || params[last].charAt(0) === ':') {
    params[last] = `:${params[last]}`
  }

  return `${command.toUpperCase()} ${params.join(' ')}`.trimRight()
}
