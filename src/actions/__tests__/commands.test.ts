import { commandMap } from '@app/actions/commands'

describe('commands actions', () => {
  const route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should handle /close', () => {
    expect(commandMap.close.callback(route)).toMatchSnapshot()
  })

  it('should handle /help', () => {
    expect(commandMap.help.callback(route)).toMatchSnapshot()
  })

  it('should handle /help with given command', () => {
    expect(commandMap.help.callback(route, 'msg')).toMatchSnapshot()
  })

  it('should handle /join', () => {
    expect(commandMap.join.callback(route, '#channel')).toMatchSnapshot()
  })

  it('should handle /msg', () => {
    expect(commandMap.msg.callback(route, '#channel', 'hello')).toMatchSnapshot()
  })

  it('should handle /nick', () => {
    expect(commandMap.nick.callback(route, 'new_nick')).toMatchSnapshot()
  })

  it('should handle /part', () => {
    expect(
      commandMap.part.callback(route, '#channel', 'Goodbye!'),
    ).toMatchSnapshot()
  })

  it('should handle /ping', () => {
    expect(commandMap.ping.callback(route)).toMatchSnapshot()
  })

  it('should handle /server', () => {
    expect(
      commandMap.server.callback(route, '-n', 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /server -n', () => {
    expect(
      commandMap.server.callback(route, 'irc.network', '6667'),
    ).toMatchSnapshot()
  })

  it('should handle /quit', () => {
    expect(commandMap.quit.callback(route, 'Goodbye!')).toMatchSnapshot()
  })

  it('should handle /raw', () => {
    expect(
      commandMap.raw.callback(route, 'PRIVMSG #channel :hello world'),
    ).toMatchSnapshot()
  })
})
