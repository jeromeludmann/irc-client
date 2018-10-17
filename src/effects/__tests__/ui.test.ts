import { ui, closeWindowProperly } from '../ui'
import { takeEvery, put } from 'redux-saga/effects'
import { CLOSE_WINDOW, closeWindow } from '@app/actions/ui'
import { sendPart } from '@app/actions/messages/outgoing'
import { BufferKey } from '@app/utils/Route'
import { disconnectFromServer } from '@app/actions/socket'

describe('ui effects', () => {
  const gen = ui()

  it('should watch CLOSE_WINDOW', () => {
    expect(gen.next().value).toEqual(
      takeEvery(CLOSE_WINDOW, closeWindowProperly),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('close window properly', () => {
  describe('on status', () => {
    const effects = closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: BufferKey.STATUS }),
    )

    it('should disconnect from server', () => {
      expect(effects.next().value).toEqual(
        put(disconnectFromServer('serverKey')),
      )
    })

    it('should be done', () => {
      expect(effects.next().done).toBeTruthy()
    })
  })

  describe('on channel', () => {
    const gen = closeWindowProperly(
      closeWindow({ serverKey: 'serverKey', bufferKey: '#channel' }),
    )

    it('should send PART message', () => {
      expect(gen.next().value).toEqual(put(sendPart('serverKey', '#channel')))
    })

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy()
    })
  })
})
