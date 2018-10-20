import { pingReply, replyWithPong } from '../pingReply'
import {
  RECEIVE_PING_FROM_SERVER,
  ReceivePingFromServerAction,
  messageReceivers,
} from '@app/actions/messages/incoming'
import { takeEvery, put } from 'redux-saga/effects'
import { sendPongToServer } from '@app/actions/messages/outgoing'

describe('ping reply effects', () => {
  const gen = pingReply()

  it('should watch RECEIVE_PING_FROM_SERVER', () => {
    expect(gen.next().value).toEqual(
      takeEvery(RECEIVE_PING_FROM_SERVER, replyWithPong),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('reply with pong', () => {
  const gen = replyWithPong(messageReceivers.PING('serverKey', 'irc.network', [
    'key',
  ]) as ReceivePingFromServerAction)

  it('should send pong to server', () => {
    expect(gen.next().value).toEqual(put(sendPongToServer('serverKey', 'key')))
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
