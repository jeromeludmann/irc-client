import { getBufferFactory } from '@app/state/buffer/selectors'
import { rootInitialState } from '@app/state/root/reducer'
import { Route } from '@app/utils/Route'

describe('getBufferFactory()', () => {
  it('should get "getBuffer" selector', () => {
    expect(getBufferFactory()(rootInitialState)).toMatchSnapshot()
  })
})

describe('getBufferFactory(route)', () => {
  it('should get "getBuffer" selector', () => {
    const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }
    expect(getBufferFactory(route)(rootInitialState)).toMatchSnapshot()
  })
})
