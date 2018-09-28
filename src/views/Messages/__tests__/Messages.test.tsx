import React from 'react'
import { shallow } from 'enzyme'
import Messages from '@app/views/Messages/Messages'

describe('Messages component', () => {
  const messages = ['hello', 'world']

  it('should render correctly', () => {
    expect(shallow(<Messages messages={messages} />)).toMatchSnapshot()
  })
})
