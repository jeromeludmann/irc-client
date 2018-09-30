import { messageReceivers } from '@app/actions/messages/incoming'
import { User } from '@app/core/Message'

describe('incoming messages actions', () => {
  const user: User = { nick: 'nick', user: 'user', host: 'host' }

  it('should receive ERROR', () => {
    expect(
      messageReceivers.ERROR('serverKey', '', ['Error message']),
    ).toMatchSnapshot()
  })

  it('should receive JOIN', () => {
    expect(
      messageReceivers.JOIN('serverKey', user, ['#channel']),
    ).toMatchSnapshot()
  })

  it('should receive NICK', () => {
    expect(
      messageReceivers.NICK('serverKey', user, ['new_nick']),
    ).toMatchSnapshot()
  })

  it('should receive NOTICE from server', () => {
    expect(
      messageReceivers.NOTICE('serverKey', 'irc.network', [
        'irc.network',
        'hello world',
      ]),
    ).toMatchSnapshot()
  })

  it('should receive NOTICE from channel', () => {
    expect(
      messageReceivers.NOTICE('serverKey', user, ['#channel', 'hello world']),
    ).toMatchSnapshot()
  })

  it('should receive NOTICE from user', () => {
    expect(
      messageReceivers.NOTICE('serverKey', user, ['me', 'hello world']),
    ).toMatchSnapshot()
  })

  it('should receive PART', () => {
    expect(
      messageReceivers.PART('serverKey', user, ['#channel']),
    ).toMatchSnapshot()
  })

  it('should receive PART with message', () => {
    expect(
      messageReceivers.PART('serverKey', user, ['#channel', 'Goodbye!']),
    ).toMatchSnapshot()
  })

  it('should receive PONG', () => {
    expect(
      messageReceivers.PONG('serverKey', 'irc.network', ['irc.network', 'key']),
    ).toMatchSnapshot()
  })

  it('should receive PRIVMSG', () => {
    expect(
      messageReceivers.PRIVMSG(
        'serverKey',
        { nick: 'nick1', user: 'user', host: 'host' },
        ['nick2', 'hello world'],
      ),
    ).toMatchSnapshot()
  })

  it('should receive 004', () => {
    expect(
      messageReceivers['004']('serverKey', 'irc.network', [
        '?',
        'irc.network',
        'version',
        'available_user_modes',
        'available_channel_modes',
      ]),
    ).toMatchSnapshot()
  })
})
