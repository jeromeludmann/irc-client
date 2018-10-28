import * as UiEffects from '../ui'
import { takeEvery, put, select, call } from 'redux-saga/effects'
import { CLOSE_WINDOW, closeWindow, addNewServer } from '@app/actions/ui'
import { sendPart } from '@app/actions/messages/outgoing'
import { BufferKey } from '@app/utils/Route'
import {
  disconnectFromServer,
  CONNECT_TO_SERVER,
  connectToServer,
} from '@app/actions/socket'
import { getServerKeys } from '@app/state/root/selectors'
import { generateKey } from '@app/utils/generateKey'

describe('ui effects', () => {
  const watch = UiEffects.watch()

  it('should watch CLOSE_WINDOW', () => {
    expect(watch.next().value).toEqual(
      takeEvery(CLOSE_WINDOW, UiEffects.closeWindowProperly),
    )
  })

  it('should watch CONNECT_TO_SERVER', () => {
    expect(watch.next().value).toEqual(
      takeEvery(CONNECT_TO_SERVER, UiEffects.addNewServerIfNeeded),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('close window properly', () => {
  describe('on channel', () => {
    const closeWindowProperly = UiEffects.closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: '#channel' }),
    )

    it('should send PART message', () => {
      expect(closeWindowProperly.next().value).toEqual(
        put(sendPart('serverKey', '#channel')),
      )
    })

    it('should be done', () => {
      expect(closeWindowProperly.next().done).toBeTruthy()
    })
  })

  describe('on raw', () => {
    const closeWindowProperly = UiEffects.closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: BufferKey.RAW }),
    )

    it('should disconnect from server', () => {
      expect(closeWindowProperly.next().value).toEqual(
        put(disconnectFromServer('serverKey')),
      )
    })

    it('should be done', () => {
      expect(closeWindowProperly.next().done).toBeTruthy()
    })
  })

  describe('on unknown', () => {
    const closeWindowProperly = UiEffects.closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: '@unknown' }),
    )

    expect(closeWindowProperly.next().done).toBeTruthy()
  })
})

describe('do not add new server', () => {
  const addNewServerIfNeeded = UiEffects.addNewServerIfNeeded(
    connectToServer('serverKey', 'irc.network', 6667, false),
  )

  expect(addNewServerIfNeeded.next().done).toBeTruthy()
})

describe('add new server if needed', () => {
  const addNewServerIfNeeded = UiEffects.addNewServerIfNeeded(
    connectToServer('serverKey', 'irc.network', 6667, true),
  )

  it('should get server keys from state', () => {
    expect(addNewServerIfNeeded.next().value).toEqual(select(getServerKeys))
  })

  const existingServerKeys = ['serverKey']

  it('should generate key', () => {
    expect(addNewServerIfNeeded.next(existingServerKeys).value).toEqual(
      call(generateKey, existingServerKeys),
    )
  })

  const serverKey = 'serverKey2'

  it('should add new server', () => {
    expect(addNewServerIfNeeded.next(serverKey).value).toEqual(
      put(addNewServer({ serverKey, bufferKey: BufferKey.NONE })),
    )
  })

  it('should be done', () => {
    expect(addNewServerIfNeeded.next().done).toBeTruthy()
  })
})
