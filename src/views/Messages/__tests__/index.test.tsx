import React from 'react'
import { shallow } from 'enzyme'
import { store } from '@app/store'
import Messages from '@app/views/Messages'

describe('MessageList container', () => {
  it('should render correctly', () => {
    expect(shallow(<Messages />, { context: { store } })).toMatchSnapshot()
  })
})
