import { reduceBuffer, bufferInitialState } from '@app/state/buffer/reducer'
import { messageReceivers } from '@app/actions/messages/incoming'
import { User } from '@app/utils/Message'
import { serverInitialState } from '@app/state/server/reducer'
import { switchWindow } from '@app/actions/ui'
import { Route } from '@app/utils/Route'

describe('reduce buffer state', () => {
  const someone: User = { nick: 'someone', user: 'user', host: 'host' }
  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }
  const extraStates = { server: serverInitialState, route }

  it('should handle RECEIVE_JOIN', () => {
    expect(
      reduceBuffer(
        undefined!,
        messageReceivers.JOIN('serverKey', someone, ['#channel']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle SWITCH_WINDOW', () => {
    expect(
      reduceBuffer(bufferInitialState, switchWindow(route), extraStates),
    ).toMatchSnapshot()
  })
})
