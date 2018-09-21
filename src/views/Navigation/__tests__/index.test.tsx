import React from 'react'
import { shallow } from 'enzyme'
import Navigation from '@app/views/Navigation'
import { store } from '@app/store'

describe('Navigation container', () => {
  it('should render correctly', () => {
    expect(shallow(<Navigation />, { context: { store } })).toMatchSnapshot()
  })
})
