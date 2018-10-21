import * as UiEffects from '../ui'
import { takeEvery, put } from 'redux-saga/effects'
import { CLOSE_WINDOW, closeWindow } from '@app/actions/ui'
import { sendPart } from '@app/actions/messages/outgoing'
import { BufferKey } from '@app/utils/Route'
import { disconnectFromServer } from '@app/actions/socket'

describe('ui effects', () => {
  const watch = UiEffects.watch()

  it('should watch CLOSE_WINDOW', () => {
    expect(watch.next().value).toEqual(
      takeEvery(CLOSE_WINDOW, UiEffects.closeWindowProperly),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('close window properly', () => {
  describe('on status', () => {
    const closeWindowProperly = UiEffects.closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: BufferKey.STATUS }),
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
})
