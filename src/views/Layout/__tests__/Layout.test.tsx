import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from '@app/views/Layout'

describe('Layout component', () => {
  it('should render correctly', () => {
    expect(shallow(<Layout />)).toMatchSnapshot()
  })
})
