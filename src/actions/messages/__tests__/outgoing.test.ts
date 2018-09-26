import {
  sendPart,
  sendPingToServer,
  sendPongToServer,
  sendQuit,
  sendUser,
  sendJoin,
  sendNick,
  sendPrivmsg,
} from '@app/actions/messages/outgoing'

describe('outgoing messages actions', () => {
  it('should send JOIN', () => {
    expect(sendJoin('serverKey', '#channel')).toMatchSnapshot()
  })

  it('should send NICK', () => {
    expect(sendNick('serverKey', 'new_nick')).toMatchSnapshot()
  })

  it('should send PART', () => {
    expect(sendPart('serverKey', '#channel')).toMatchSnapshot()
  })

  it('should send PART with message', () => {
    expect(sendPart('serverKey', '#channel', 'Goodbye!')).toMatchSnapshot()
  })

  it('should send PING', () => {
    expect(sendPingToServer('serverKey', 'key')).toMatchSnapshot()
  })

  it('should send PONG', () => {
    expect(sendPongToServer('serverKey', 'key')).toMatchSnapshot()
  })

  it('should send PRIVMSG', () => {
    expect(
      sendPrivmsg('serverKey', '#channel', 'hello world'),
    ).toMatchSnapshot()
  })

  it('should send QUIT', () => {
    expect(sendQuit('serverKey')).toMatchSnapshot()
  })

  it('should send QUIT with message', () => {
    expect(sendQuit('serverKey', 'Goodbye!')).toMatchSnapshot()
  })

  it('should send USER', () => {
    expect(sendUser('serverKey', 'username', 'Real Name')).toMatchSnapshot()
  })
})
