import { reduceRoute, routeInitialState } from '@app/reducers/route'
import { closeWindow, switchWindow } from '@app/actions/ui'
import { messageReceivers } from '@app/actions/msgIncoming'
import { rootInitialState } from '@app/reducers'
import { serverInitialState } from '@app/reducers/server'
import { bufferInitialState } from '@app/reducers/buffer'
import { BufferKey } from '@app/utils/Route'

describe('reduce route state', () => {
  const someone = { nick: 'someone', user: 'user', host: 'host' }
  const me = { nick: 'me', user: 'user', host: 'host' }
  

  const extraStates = {
    root: {
      ...rootInitialState,
      servers: {
        serverKey: {
          ...serverInitialState,
          user: { nick: 'me', user: 'user', real: 'Realname' },
          buffers: {
            ...serverInitialState.buffers,
            '#channel': bufferInitialState,
          },
        },
      },
    },
  }

  it('should handle CLOSE_WINDOW on status', () => {
    expect(
      reduceRoute(
        { serverKey: 'serverKey', bufferKey: BufferKey.STATUS },
        closeWindow({ serverKey: 'serverKey', bufferKey: BufferKey.STATUS }),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle CLOSE_WINDOW on channel', () => {
    expect(
      reduceRoute(
        { serverKey: 'serverKey', bufferKey: '#channel' },
        closeWindow({ serverKey: 'serverKey', bufferKey: '#channel' }),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_JOIN', () => {
    expect(
      reduceRoute(
        routeInitialState,
        messageReceivers.JOIN('serverKey', someone, ['#channel']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_JOIN when it is me', () => {
    expect(
      reduceRoute(
        routeInitialState,
        messageReceivers.JOIN('serverKey', me, ['#channel']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PART', () => {
    expect(
      reduceRoute(
        routeInitialState,
        messageReceivers.PART('serverKey', someone, ['#channel', 'Goodbye!']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PART when it is me', () => {
    expect(
      reduceRoute(
        routeInitialState,
        messageReceivers.PART('serverKey', me, ['#channel', 'Goodbye!']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle SWITCH_WINDOW', () => {
    expect(
      reduceRoute(
        routeInitialState,
        switchWindow({ serverKey: 'serverKey', bufferKey: '#channel' }),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle SWITCH_WINDOW with a not found route', () => {
    expect(
      reduceRoute(
        routeInitialState,
        switchWindow({ serverKey: 'unknown', bufferKey: '#unknown' }),
        extraStates,
      ),
    ).toMatchSnapshot()
  })
})
