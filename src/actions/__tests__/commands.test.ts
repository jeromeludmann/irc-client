import { commandRegistry } from '@app/actions/commands'

describe('commands actions', () => {
  const route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should handle /close', () => {
    expect(commandRegistry.close.callback(route)).toMatchSnapshot()
  })

  it('should handle /help', () => {
    expect(commandRegistry.help.callback(route)).toMatchSnapshot()
  })

  it('should handle /help with given command', () => {
    expect(commandRegistry.help.callback(route, 'msg')).toMatchSnapshot()
  })

  it('should handle /join', () => {
    expect(commandRegistry.join.callback(route, '#channel')).toMatchSnapshot()
  })

  it('should handle /msg', () => {
    expect(commandRegistry.msg.callback(route, '#channel', 'hello')).toMatchSnapshot()
  })

  it('should handle /nick', () => {
    expect(commandRegistry.nick.callback(route, 'new_nick')).toMatchSnapshot()
  })

  it('should handle /part', () => {
    expect(
      commandRegistry.part.callback(route, '#channel', 'Goodbye!'),
    ).toMatchSnapshot()
  })

  it('should handle /ping', () => {
    expect(commandRegistry.ping.callback(route)).toMatchSnapshot()
  })

  it('should handle /server', () => {
    expect(
      commandRegistry.server.callback(route, '-n', 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /server -n', () => {
    expect(
      commandRegistry.server.callback(route, 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /quit', () => {
    expect(commandRegistry.quit.callback(route, 'Goodbye!')).toMatchSnapshot()
  })

  it('should handle /raw', () => {
    expect(
      commandRegistry.raw.callback(route, 'PRIVMSG #channel :hello world'),
    ).toMatchSnapshot()
  })
})
