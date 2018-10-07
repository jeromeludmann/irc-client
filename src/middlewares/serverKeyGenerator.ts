import { Store, Dispatch } from 'redux'
import { ConnectToServerAction, CONNECT_TO_SERVER } from '@app/actions/socket'
import { getServers } from '@app/state/root/selectors'
import { generateServerKey } from '@app/utils/helpers'

export function serverKeyGenerator(store: Store) {
  return (next: Dispatch) => (action: ConnectToServerAction) => {
    if (action.type === CONNECT_TO_SERVER && action.payload.newConnection) {
      const serverKeys = Object.keys(getServers(store.getState()))
      action.route.serverKey = generateServerKey(serverKeys)
    }

    next(action)
  }
}
