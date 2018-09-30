import { put, all, takeLatest } from 'redux-saga/effects'
import { RAW_MESSAGES_RECEIVED, RawMessagesAction } from '@app/actions/socket'
import { messageReceivers } from '@app/actions/messages/incoming'
import { parseMessage } from '@app/middlewares/messageParser'
import { SagaIterator } from 'redux-saga'

function* parseMessages(action: RawMessagesAction) {
  console.log('connectToServerSaga')

  yield all(
    action.payload.messages.map(rawMessage => {
      const { prefix, command, params } = parseMessage(rawMessage)
      return command in messageReceivers
        ? put(messageReceivers[command](action.route.serverKey, prefix, params))
        : null
    }),
  )
}

export function* mySaga(): SagaIterator {
  yield takeLatest(RAW_MESSAGES_RECEIVED, parseMessages)
}
