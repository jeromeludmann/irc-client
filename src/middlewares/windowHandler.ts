import { Middleware } from 'redux'
import { CloseWindowAction, CLOSE_WINDOW } from '@app/actions/ui'
import { RootState } from '@app/state/root/reducer'
import { isChannel, isStatus, isRaw } from '@app/utils/Route'
import { disconnectFromServer } from '@app/actions/socket'
import { sendPart } from '@app/actions/messages/outgoing'

/**
 * UI side-effects middleware
 *
 * Handle all UI actions with side-effects.
 */
export const windowHandler: Middleware<{}, RootState> = _ => next => (
  action: CloseWindowAction,
) => {
  next(action)

  if (action.type === CLOSE_WINDOW) {
    if (isChannel(action.route.bufferKey)) {
      const channel = action.route.bufferKey
      next(sendPart(action.route.serverKey, channel))
    } else if (
      isStatus(action.route.bufferKey) ||
      isRaw(action.route.bufferKey)
    ) {
      next(disconnectFromServer(action.route.serverKey))
    }
  }
}
