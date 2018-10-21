import {
  messageReceivers,
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from '@app/actions/messages/incoming'
import * as LagEffects from '../lag'
import { takeEvery, call, put } from 'redux-saga/effects'
import { updateServerLag } from '@app/actions/ui'
import { computeLag } from '@app/utils/lag'

describe('lag effects', () => {
  const watch = LagEffects.watch()

  it('should watch RECEIVE_PONG_FROM_SERVER', () => {
    expect(watch.next().value).toEqual(
      takeEvery(RECEIVE_PONG_FROM_SERVER, LagEffects.computeServerLag),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('compute server lag', () => {
  const computeServerLag = LagEffects.computeServerLag(messageReceivers.PONG(
    'serverKey',
    'irc.network',
    ['irc.network', '1536211245164'],
  ) as ReceivePongFromServerAction)

  it('should compute lag', () => {
    expect(computeServerLag.next().value).toEqual(
      call(computeLag, 1536211245164),
    )
  })

  it('should update lag', () => {
    expect(computeServerLag.next(1536211245164).value).toEqual(
      put(updateServerLag('serverKey', 1536211245164)),
    )
  })

  it('should be done', () => {
    expect(computeServerLag.next().done).toBeTruthy()
  })
})
