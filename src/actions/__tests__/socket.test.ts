import {
  connectToServer,
  setConnectionEstablished,
  lookup,
  setConnectionClosed,
  disconnectFromServer,
  sendRawMessage,
  setConnectionFailed,
} from '@app/actions/socket'

describe('socket actions', () => {
  it('should create ConnectServerAction with existing connection', () => {
    expect(connectToServer('server1', 'irc.network', 6667)).toMatchSnapshot()
  })

  it('should create ConnectServerAction with new connection', () => {
    expect(
      connectToServer('serverKey', 'irc.network', 6667, true),
    ).toMatchSnapshot()
  })

  it('should create DisconnectFromServerAction', () => {
    expect(disconnectFromServer('serverKey', 'Goodbye!')).toMatchSnapshot()
  })

  it('should create LookupSuccessAction', () => {
    expect(
      lookup('serverKey', null, 'address', 'family', 'irc.network'),
    ).toMatchSnapshot()
  })

  it('should create LookupFailedAction', () => {
    expect(
      lookup(
        'serverKey',
        new Error('error while looking up'),
        'address',
        'family',
        'irc.network',
      ),
    ).toMatchSnapshot()
  })

  it('should create SendRawMessageAction', () => {
    expect(
      sendRawMessage('serverKey', 'PRIVMSG #channel :hello world'),
    ).toMatchSnapshot()
  })

  it('should create ConnectionEstablishedAction', () => {
    expect(setConnectionEstablished('serverKey')).toMatchSnapshot()
  })

  it('should create ConnectionClosedAction', () => {
    expect(setConnectionClosed('serverKey')).toMatchSnapshot()
  })

  it('should create ConnectionClosedAction with error', () => {
    expect(setConnectionClosed('serverKey', true)).toMatchSnapshot()
  })

  it('should create ConnectionFailedAction', () => {
    expect(
      setConnectionFailed('serverKey', 'Error', 'Error message'),
    ).toMatchSnapshot()
  })
})
