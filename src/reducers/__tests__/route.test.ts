import { reduceRoute } from '@app/reducers/route'
import { switchWindow, closeWindow } from '@app/actions/ui'
import { serverInitialState } from '@app/reducers/server'
import { messageReceivers } from '@app/actions/msgIncoming'
import { BufferKey } from '@app/utils/Route'
import { serverRouterInitialState } from '@app/reducers/serverRouter'

describe('reduce route', () => {
  describe('with join receveid', () => {
    test('when an user joins a channel', () => {
      expect(
        reduceRoute(
          undefined,
          messageReceivers['JOIN'](
            'server1',
            { nick: 'nick', user: 'user', host: 'host' },
            ['#channel'],
          ),
          { servers: { server1: serverInitialState } },
        ),
      ).toMatchSnapshot()
    })

    test('when I join a channel myself', () => {
      expect(
        reduceRoute(
          undefined,
          messageReceivers['JOIN'](
            'server1',
            { nick: 'nick', user: 'user', host: 'host' },
            ['#channel'],
          ),
          {
            servers: {
              server1: {
                ...serverInitialState,
                user: { ...serverInitialState.user, nick: 'nick' },
              },
            },
          },
        ),
      ).toMatchSnapshot()
    })
  })

  describe('close window', () => {
    test('on a status', () => {
      expect(
        reduceRoute(
          { serverKey: 'server1', bufferKey: BufferKey.STATUS },
          closeWindow({ serverKey: 'server1', bufferKey: BufferKey.STATUS }),
          {
            servers: { server1: serverInitialState },
          },
        ),
      ).toMatchSnapshot()

      expect(
        reduceRoute(
          { serverKey: 'server1', bufferKey: BufferKey.STATUS },
          closeWindow({ serverKey: 'server1', bufferKey: BufferKey.STATUS }),
          {
            servers: {
              server1: serverInitialState,
              server2: serverInitialState,
            },
          },
        ),
      ).toMatchSnapshot()
    })

    test('on a channel', () => {
      expect(
        reduceRoute(
          { serverKey: 'server1', bufferKey: '#channel' },
          closeWindow({ serverKey: 'server1', bufferKey: '#channel' }),
          { servers: { server1: serverInitialState } },
        ),
      ).toMatchSnapshot()
    })
  })

  describe('switch window', () => {
    test('on a status', () => {
      expect(
        reduceRoute(
          undefined,
          switchWindow({ serverKey: 'server1', bufferKey: BufferKey.STATUS }),
          { servers: serversInitialState },
        ),
      ).toMatchSnapshot()
    })

    test('on a channel', () => {
      expect(
        reduceRoute(
          undefined,
          switchWindow({ serverKey: 'server1', bufferKey: '#channel' }),
          { servers: serversInitialState },
        ),
      ).toMatchSnapshot()
    })
  })
})
