import { reduceBuffer, bufferInitialState } from '@app/reducers/buffer'
import { messageReceivers } from '@app/actions/msgIncoming'
import { User } from '@app/utils/Message'
import { serverInitialState } from '@app/reducers/server'
import { switchWindow } from '@app/actions/ui'
import { Route } from '@app/utils/Route'

describe('reduce buffer state', () => {
  const someone: User = { nick: 'someone', user: 'user', host: 'host' }
  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }
  const extraStates = { server: serverInitialState, route }

  it('should handle RECEIVE_JOIN', () => {
    expect(
      reduceBuffer(
        bufferInitialState,
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
