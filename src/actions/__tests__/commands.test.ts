import { commands } from '@app/actions/commands'

describe('commands actions', () => {
  const route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should handle /close', () => {
    expect(commands.close.callback(route)).toMatchSnapshot()
  })

  it('should handle /help', () => {
    expect(commands.help.callback(route)).toMatchSnapshot()
  })

  it('should handle /help with given command', () => {
    expect(commands.help.callback(route, 'msg')).toMatchSnapshot()
  })

  it('should handle /join', () => {
    expect(commands.join.callback(route, '#channel')).toMatchSnapshot()
  })

  it('should handle /msg', () => {
    expect(commands.msg.callback(route, '#channel', 'hello')).toMatchSnapshot()
  })

  it('should handle /nick', () => {
    expect(commands.nick.callback(route, 'new_nick')).toMatchSnapshot()
  })

  it('should handle /part', () => {
    expect(
      commands.part.callback(route, '#channel', 'Goodbye!'),
    ).toMatchSnapshot()
  })

  it('should handle /ping', () => {
    expect(commands.ping.callback(route)).toMatchSnapshot()
  })

  it('should handle /server', () => {
    expect(
      commands.server.callback(route, '-n', 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /server -n', () => {
    expect(
      commands.server.callback(route, 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /quit', () => {
    expect(commands.quit.callback(route, 'Goodbye!')).toMatchSnapshot()
  })

  it('should handle /raw', () => {
    expect(
      commands.raw.callback(route, 'PRIVMSG #channel :hello world'),
    ).toMatchSnapshot()
  })
})
