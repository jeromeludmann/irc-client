import React from 'react'
import { shallow, mount } from 'enzyme'
import Navigation from '@app/views/Navigation/Navigation'
import { BufferKey } from '@app/utils/Route'
import { serverInitialState } from '@app/state/server/reducer'

describe('Navigation component', () => {
  const props = {
    servers: {
      serverKey: {
        name: 'irc.network',
        buffers: {
          ...serverInitialState.buffers,
          '#channel': { activity: true },
        },
      },
    },
    window: { serverKey: 'serverKey', bufferKey: BufferKey.STATUS },
    onWindowButtonClick: jest.fn(),
  }

  it('should render correctly', () => {
    expect(shallow(<Navigation {...props} />)).toMatchSnapshot()
  })

  it('should handle button click event', () => {
    mount(<Navigation {...props} />)
      .find('button')
      .first()
      .simulate('click')
  })
})
