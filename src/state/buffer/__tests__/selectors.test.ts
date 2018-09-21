import { selectBuffer, selectActivity } from '@app/state/buffer/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select buffer state', () => {
  it('should select buffer', () => {
    expect(selectBuffer(rootInitialState)).toMatchSnapshot()
  })

  it('should select activity', () => {
    expect(selectActivity(rootInitialState)).toMatchSnapshot()
  })
})
