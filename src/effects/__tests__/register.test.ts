import { exploreSaga } from '@util/exploreSaga'
import { setConnectionEstablished } from '@app/actions/socket'
import { runRegister } from '../register'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'
import { RootState, rootInitialState } from '@app/state/root/reducer'

describe('run register', () => {
  const output = exploreSaga<RootState>(
    {
      actions: [setConnectionEstablished('serverKey')],
      state: rootInitialState,
    },
    runRegister,
  )

  it('should dispatch send user', () => {
    expect(output.actions).toContainEqual(
      sendUser('serverKey', 'default_user', 'default_name'),
    )
  })

  it('should dispatch send nick', () => {
    expect(output.actions).toContainEqual(sendNick('serverKey', 'default_nick'))
  })

  it('should match snapshot', () => {
    expect(output.actions).toMatchSnapshot()
  })
})
