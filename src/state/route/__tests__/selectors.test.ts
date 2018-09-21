import { selectRoute } from '@app/state/route/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select route state', () => {
  it('should select route', () => {
    expect(selectRoute(rootInitialState)).toMatchSnapshot()
  })
})
