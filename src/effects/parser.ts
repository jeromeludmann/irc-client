import { put, takeEvery } from 'redux-saga/effects'
import { RawMessagesAction, RAW_MESSAGES_RECEIVED } from '@app/actions/socket'
import { messageReceivers } from '@app/actions/messages/incoming'
import { GenericMessage, Prefix, Tags } from '@app/utils/Message'
import { IRC_MESSAGE_LENGTH } from '@app/utils/helpers'

export function* parser() {
  yield takeEvery(RAW_MESSAGES_RECEIVED, parseRawMessages)
}

export function* parseRawMessages(action: RawMessagesAction) {
  const {
    payload: { messages },
    route: { serverKey },
  } = action

  for (const rawMessage of messages) {
    const { prefix, command, params } = parseMessage(rawMessage)

    if (command in messageReceivers) {
      yield put(messageReceivers[command](serverKey, prefix, params))
    } else {
      console.log(`Unknown command: ${command}`)
    }
  }
}

function parseMessage(rawMessage: string): GenericMessage {
  const genericMessage: GenericMessage = {
    command: '',
    params: [],
  }

  if (rawMessage.length > IRC_MESSAGE_LENGTH) {
    rawMessage = rawMessage.slice(0, IRC_MESSAGE_LENGTH)
  }

  let pos: number

  // Tags

  if (rawMessage.charAt(0) === '@') {
    pos = rawMessage.indexOf(' ')
    genericMessage.tags = parseTags(rawMessage.slice(1, pos))
    rawMessage = rawMessage.slice(pos + 1)
  }

  // Prefix

  if (rawMessage.charAt(0) === ':') {
    pos = rawMessage.indexOf(' ')
    genericMessage.prefix = parsePrefix(rawMessage.slice(1, pos))
    rawMessage = rawMessage.slice(pos + 1)
  }

  // Command

  pos = rawMessage.indexOf(' ')
  if (pos === -1) {
    pos = rawMessage.length
  }
  genericMessage.command = rawMessage.slice(0, pos).toUpperCase()
  rawMessage = rawMessage.slice(pos + 1)

  // Middle parameters

  while (rawMessage.length > 0 && rawMessage.charAt(0) !== ':') {
    pos = rawMessage.indexOf(' ')
    if (pos === -1) {
      pos = rawMessage.length
    }
    const middle = rawMessage.slice(0, pos)
    genericMessage.params.push(middle)
    rawMessage = rawMessage.slice(pos + 1)
  }

  // Trailing parameter

  if (rawMessage.length > 0) {
    const trailing = rawMessage.slice(1)
    genericMessage.params.push(trailing)
  }

  return genericMessage
}

function parsePrefix(prefix: string): Prefix {
  const i = prefix.indexOf('!')
  if (i === -1) {
    return prefix
  }

  const j = prefix.indexOf('@')

  return {
    nick: prefix.slice(0, i),
    user: prefix.slice(i + 1, j),
    host: prefix.slice(j + 1),
  }
}

function parseTags(tags: string): Tags {
  return tags.includes(';') ? tags.split(';') : [tags]
}
