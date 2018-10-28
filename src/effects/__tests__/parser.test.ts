import { takeEvery, put } from 'redux-saga/effects'
import * as ParserEffects from '../parser'
import { RAW_MESSAGES_RECEIVED, receiveRawMessages } from '@app/actions/socket'
import { messageReceivers } from '@app/actions/messages/incoming'

describe('parser effects', () => {
  const watch = ParserEffects.watch()

  it('should watch RAW_MESSAGES_RECEIVED', () => {
    expect(watch.next().value).toEqual(
      takeEvery(RAW_MESSAGES_RECEIVED, ParserEffects.parseRawMessages),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('parse raw messages', () => {
  const rawMessages = [
    'PING :abcdefghij',
    ':nick!user@host JOIN :#channel',
    ':nick!user@host PRIVMSG #channel :hello',
    '@aaa=bbb :nick!user@host PRIVMSG #channel :hello with one tag',
    '@aaa=bbb;ccc;example.com/ddd=eee :nick!user@host PRIVMSG #channel :hello with many tags',
    ':nick!user@host PART #channel :goodbye',
  ]
  const parseRawMessages = ParserEffects.parseRawMessages(
    receiveRawMessages('serverKey', rawMessages),
  )
  const user = { nick: 'nick', user: 'user', host: 'host' }

  it('should receive PING message', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(messageReceivers.PING('serverKey', undefined, ['abcdefghij'])),
    )
  })

  it('should receive JOIN message', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(messageReceivers.JOIN('serverKey', user, ['#channel'])),
    )
  })

  it('should receive PRIVMSG message', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(messageReceivers.PRIVMSG('serverKey', user, ['#channel', 'hello'])),
    )
  })

  it('should receive PRIVMSG message with one tag', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(
        messageReceivers.PRIVMSG('serverKey', user, [
          '#channel',
          'hello with one tag',
        ]),
      ),
    )
  })

  it('should receive PRIVMSG message with many tags', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(
        messageReceivers.PRIVMSG('serverKey', user, [
          '#channel',
          'hello with many tags',
        ]),
      ),
    )
  })

  it('should receive PART message', () => {
    expect(parseRawMessages.next().value).toEqual(
      put(messageReceivers.PART('serverKey', user, ['#channel', 'goodbye'])),
    )
  })

  it('should be done', () => {
    expect(parseRawMessages.next().done).toBeTruthy()
  })
})

describe('parse bad raw messages', () => {
  const rawMessages = [
    ':irc.network WITHOUT_PARAM',
    ':nick!user@host ONLY_ONE_PARAM param1',
    ':nick!user@host MANY_PARAMS param1 param2 :param3',
    `:nick!user@host VERY_LONG_MESSAGE :${generateLongString()}`,
  ]

  const parseRawMessages = ParserEffects.parseRawMessages(
    receiveRawMessages('serverKey', rawMessages),
  )

  it('should not handle any messages and just be done', () => {
    expect(parseRawMessages.next().done).toBeTruthy()
  })
})

function generateLongString() {
  let longString = 'abcdefghijklmnopqr'

  for (let i = 0; i < 3; i++) {
    longString += longString + longString
  }

  return longString
}
