import { RoutedAction, BufferKey } from '@app/utils/Route'
import { SendRawMessageAction, SEND_RAW_MESSAGE } from '@app/actions/socket'

interface SendMessageAction<T = string, P = {}> extends RoutedAction<T> {
  payload: P
}

const toRaw = (command: string, ...params: string[]): string => {
  const last = params.length - 1

  if (params[last].indexOf(' ') > -1 || params[last].charAt(0) === ':') {
    params[last] = `:${params[last]}`
  }

  return `${command.toUpperCase()} ${params.join(' ')}`.trimRight()
}

// export const SEND_JOIN = "MESSAGE/SEND_JOIN";
// export type SendJoinAction = MessageAction<typeof SEND_JOIN>;

export const sendJoin = (
  serverKey: string,
  channel: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('join', channel) },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

// export const SEND_NICK = "MESSAGE/SEND_NICK";
// export type SendNickAction = MessageAction<typeof SEND_NICK>;

export const sendNick = (
  serverKey: string,
  nick: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('nick', nick) },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

// export const SEND_PART = "MESSAGE/SEND_PART";
// export type SendPartAction = MessageAction<typeof SEND_PART>;

export const sendPart = (
  serverKey: string,
  channel: string,
  text: string = '',
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('part', channel, text) },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

export const SEND_PING_TO_SERVER = 'MESSAGE/SEND_PING_TO_SERVER'

export type SendPingToServerAction = SendMessageAction<
  typeof SEND_PING_TO_SERVER,
  {
    key: number
  }
>

export const sendPingToServer = (
  serverKey: string,
  key = Date.now(),
): SendRawMessageAction<SendPingToServerAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('ping', key.toString()) },
  route: { serverKey, bufferKey: BufferKey.NONE },
  embeddedAction: {
    type: SEND_PING_TO_SERVER,
    payload: { key },
    route: { serverKey, bufferKey: BufferKey.STATUS },
  },
})

export const SEND_PONG_TO_SERVER = 'MESSAGE/SEND_PONG_TO_SERVER'

export type SendPongToServerAction = SendMessageAction<
  typeof SEND_PONG_TO_SERVER,
  {
    key: string
  }
>

export const sendPongToServer = (
  serverKey: string,
  key: string,
): SendRawMessageAction<SendPongToServerAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('pong', key) },
  route: { serverKey, bufferKey: BufferKey.NONE },
  embeddedAction: {
    type: SEND_PONG_TO_SERVER,
    payload: { key },
    route: { serverKey, bufferKey: BufferKey.STATUS },
  },
})

export const SEND_PRIVMSG = 'MESSAGE/SEND_PRIVMSG'

export type SendPrivmsgAction = SendMessageAction<
  typeof SEND_PRIVMSG,
  { text: string }
>

export const sendPrivmsg = (
  serverKey: string,
  channel: string,
  text: string,
): SendRawMessageAction<SendPrivmsgAction> => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('privmsg', channel, text) },
  route: { serverKey, bufferKey: BufferKey.NONE },
  embeddedAction: {
    type: SEND_PRIVMSG,
    payload: { text },
    route: { serverKey, bufferKey: channel },
  },
})

// export const SEND_QUIT = "MESSAGE/SEND_QUIT";
// export type SendQuitAction = MessageAction<typeof SEND_QUIT>;

export const sendQuit = (
  serverKey: string,
  text: string = '',
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('quit', text) },
  route: { serverKey, bufferKey: BufferKey.NONE },
})

// export const SEND_USER = "MESSAGE/SEND_USER";
// export type SendUserAction = MessageAction<typeof SEND_USER>;

export const sendUser = (
  serverKey: string,
  username: string,
  realname: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  payload: { raw: toRaw('user', username, '0', '*', realname) },
  route: { serverKey, bufferKey: BufferKey.NONE },
})
