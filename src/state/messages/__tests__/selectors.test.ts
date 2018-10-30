import { getMessages } from '@app/state/messages/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('getMessages()', () => {
  it('should get messages', () => {
    expect(getMessages()(rootInitialState)).toMatchSnapshot()
  })
})
