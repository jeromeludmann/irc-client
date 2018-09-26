import {
  closeWindow,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
  switchWindow,
  updateInputValue,
} from '@app/actions/ui'
import { Route } from '@app/utils/Route'

describe('ui actions', () => {
  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should create CloseWindowAction', () => {
    expect(closeWindow(route)).toMatchSnapshot()
  })

  it('should create EnterInputValueAction', () => {
    expect(enterInputValue('hello')).toMatchSnapshot()
  })

  it('should create GoBackInputHistoryAction', () => {
    expect(goBackInputHistory()).toMatchSnapshot()
  })

  it('should create GoForwardInputHistoryAction', () => {
    expect(goForwardInputHistory()).toMatchSnapshot()
  })

  it('should create SwitchWindowAction', () => {
    expect(switchWindow(route)).toMatchSnapshot()
  })

  it('should create UpdateInputValueAction', () => {
    expect(updateInputValue('hello')).toMatchSnapshot()
  })
})
