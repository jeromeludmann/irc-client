import React from 'react'
import { shallow, mount } from 'enzyme'
import Navigation from '@app/views/navigation/Navigation'
import { BufferKey } from '@app/utils/Route'
import { bufferInitialState } from '@app/state/buffer/reducer'
import { serverInitialState } from '@app/state/server/reducer'

describe('Navigation component', () => {
  const props = {
    onWindowButtonClick: jest.fn(),
    servers: {
      serverKey: {
        name: 'irc.network',
        buffers: {
          ...serverInitialState.buffers,
          '#channel': { ...bufferInitialState, activity: true },
        },
      },
    },
    window: { serverKey: 'serverKey', bufferKey: BufferKey.STATUS },
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
