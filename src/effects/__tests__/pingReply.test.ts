import * as PingReplyEffects from '../pingReply'
import {
  RECEIVE_PING_FROM_SERVER,
  ReceivePingFromServerAction,
  messageReceivers,
} from '@app/actions/messages/incoming'
import { takeEvery, put } from 'redux-saga/effects'
import { sendPongToServer } from '@app/actions/messages/outgoing'

describe('ping reply effects', () => {
  const watch = PingReplyEffects.watch()

  it('should watch RECEIVE_PING_FROM_SERVER', () => {
    expect(watch.next().value).toEqual(
      takeEvery(RECEIVE_PING_FROM_SERVER, PingReplyEffects.replyWithPong),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('reply with pong', () => {
  const replyWithPong = PingReplyEffects.replyWithPong(messageReceivers.PING(
    'serverKey',
    'irc.network',
    ['key'],
  ) as ReceivePingFromServerAction)

  it('should send pong to server', () => {
    expect(replyWithPong.next().value).toEqual(
      put(sendPongToServer('serverKey', 'key')),
    )
  })

  it('should be done', () => {
    expect(replyWithPong.next().done).toBeTruthy()
  })
})
