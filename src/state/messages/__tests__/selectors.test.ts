import { selectMessages } from '@app/state/messages/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select messages state', () => {
  it('should select messages', () => {
    expect(selectMessages(rootInitialState)).toMatchSnapshot()
  })
})
