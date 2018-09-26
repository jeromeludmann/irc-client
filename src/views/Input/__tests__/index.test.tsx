import React from 'react'
import { shallow } from 'enzyme'
import { store } from '@app/store'
import Input from '@app/views/Input'

describe('Input container', () => {
  it('should render correctly', () => {
    expect(shallow(<Input />, { context: { store } })).toMatchSnapshot()
  })
})
