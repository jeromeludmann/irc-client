import {
  messageReceivers,
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from '@app/actions/messages/incoming'
import { lag, computeServerLag } from '../lag'
import { takeEvery, call, put } from 'redux-saga/effects'
import { updateServerLag } from '@app/actions/ui'
import { computeLag } from '@app/utils/lag'

describe('lag effects', () => {
  const gen = lag()

  it('should watch RECEIVE_PONG_FROM_SERVER', () => {
    expect(gen.next().value).toEqual(
      takeEvery(RECEIVE_PONG_FROM_SERVER, computeServerLag),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('compute server lag', () => {
  const gen = computeServerLag(messageReceivers.PONG(
    'serverKey',
    'irc.network',
    ['irc.network', '1536211245164'],
  ) as ReceivePongFromServerAction)

  it('should compute lag', () => {
    expect(gen.next().value).toEqual(call(computeLag, 1536211245164))
  })

  it('should update lag', () => {
    expect(gen.next(1536211245164).value).toEqual(
      put(updateServerLag('serverKey', 1536211245164)),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
