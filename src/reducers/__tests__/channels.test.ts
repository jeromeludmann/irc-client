import { reduceBufferRouter } from '@app/reducers/bufferRouter'
import { closeWindow } from '@app/actions/ui'
import { BufferKey } from '@app/Route'
import { bufferInitialState } from '@app/reducers/buffer'

describe('reduce channels', () => {
  const extraStates = {
    route: { serverKey: 'server1', channelKey: '' },
    user: { nick: 'nick', user: 'user', real: 'name' },
  }

  describe('without action', () => {
    test('without channel', () => {
      expect(
        reduceBufferRouter(
          undefined,
          { type: '', route: { serverKey: 'server1', bufferKey: '' } },
          extraStates,
        ),
      ).toMatchSnapshot()
    })

    test('with channel', () => {
      expect(
        reduceBufferRouter(
          undefined,
          { type: '', route: { serverKey: 'server1', bufferKey: '#channel' } },
          extraStates,
        ),
      ).toMatchSnapshot()
    })
  })

  describe('close window', () => {
    test('status window', () => {
      expect(
        reduceBufferRouter(
          {
            [BufferKey.STATUS]: bufferInitialState,
            '#channel': bufferInitialState,
            private: bufferInitialState,
          },
          closeWindow({ serverKey: 'server1', bufferKey: BufferKey.STATUS }),
          extraStates,
        ),
      ).toMatchSnapshot()
    })

    test('channel window', () => {
      expect(
        reduceBufferRouter(
          undefined,
          closeWindow({ serverKey: 'server1', bufferKey: '#channel' }),
          extraStates,
        ),
      ).toMatchSnapshot()
    })

    test('private window', () => {
      expect(
        reduceBufferRouter(
          undefined,
          closeWindow({ serverKey: 'server1', bufferKey: 'nick' }),
          extraStates,
        ),
      ).toMatchSnapshot()
    })
  })

  describe('broadcast', () => {
    test('none', () => {
      expect(
        reduceBufferRouter(
          undefined,
          {
            type: '',
            route: { serverKey: 'server1', bufferKey: Buffer.NONE },
          },
          extraStates,
        ),
      ).toMatchSnapshot()
    })

    test('active', () => {
      expect(
        reduceBufferRouter(
          undefined,
          {
            type: '',
            route: { serverKey: 'server1', bufferKey: Buffer.ACTIVE },
          },
          extraStates,
        ),
      ).toMatchSnapshot()
    })

    test('all', () => {
      expect(
        reduceBufferRouter(
          undefined,
          {
            type: '',
            route: { serverKey: 'server1', bufferKey: Buffer.ALL },
          },
          extraStates,
        ),
      ).toMatchSnapshot()
    })
  })
})
