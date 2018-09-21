import { reduceRoot, rootInitialState } from '@app/state/root/reducer'
import { closeWindow } from '@app/actions/ui'
import { serverInitialState } from '@app/state/server/reducer'
import { BufferKey } from '@app/utils/Route'
import { connectToServer } from '@app/actions/socket'

describe('reduce root state', () => {
  it('should handle CLOSE_WINDOW on channel', () => {
    expect(
      reduceRoot(
        undefined,
        closeWindow({ serverKey: 'serverKey', bufferKey: '#channel' }),
      ),
    ).toMatchSnapshot()
  })

  it('should handle CLOSE_WINDOW on private', () => {
    expect(
      reduceRoot(
        undefined,
        closeWindow({ serverKey: 'serverKey', bufferKey: 'nick' }),
      ),
    ).toMatchSnapshot()
  })

  it('should handle CLOSE_WINDOW on status with at least two servers', () => {
    expect(
      reduceRoot(
        {
          ...rootInitialState,
          servers: {
            serverKey1: serverInitialState,
            serverKey2: serverInitialState,
          },
        },
        closeWindow({ serverKey: 'serverKey', bufferKey: BufferKey.STATUS }),
      ),
    ).toMatchSnapshot()
  })

  it('should handle CONNECT_TO_SERVER action', () => {
    expect(
      reduceRoot(undefined, connectToServer('serverKey', 'server')),
    ).toMatchSnapshot()
  })

  it('should not handle anything', () => {
    expect(
      reduceRoot(undefined, {
        type: '',
        route: { serverKey: 'serverKey', bufferKey: '#channel' },
      }),
    ).toMatchSnapshot()
  })
})
