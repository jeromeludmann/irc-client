import {
  connectToServer,
  setConnectionEstablished,
  lookup,
  setConnectionClosed,
} from '@app/actions/socket'

describe('socket actions', () => {
  it('should generate ConnectServerAction with the existing connection', () => {
    expect(connectToServer('server1', 'irc.network', 6667)).toMatchSnapshot()
  })

  it('should generate ConnectServerAction with a new connection', () => {
    expect(
      connectToServer('serverKey', 'irc.network', 6667, true),
    ).toMatchSnapshot()
  })

  it('should generate ConnectionEstablishedAction', () => {
    expect(setConnectionEstablished('serverKey')).toMatchSnapshot()
  })

  it('should generate LookupSuccessAction', () => {
    expect(
      lookup('serverKey', null, 'address', 'family', 'irc.network'),
    ).toMatchSnapshot()
  })

  it('should generate LookupFailedAction', () => {
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

  it('should generate ConnectionClosedAction', () => {
    expect(setConnectionClosed('serverKey')).toMatchSnapshot()
  })

  it('should generate ConnectionClosedAction with error', () => {
    expect(setConnectionClosed('serverKey', true)).toMatchSnapshot()
  })
})
