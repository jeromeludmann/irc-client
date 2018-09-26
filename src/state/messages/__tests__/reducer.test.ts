import { reduceMessages, messagesInitialState } from '@app/state/messages/reducer'
import { routeInitialState } from '@app/state/route/reducer'
import { serverInitialState } from '@app/state/server/reducer'
import {
  connectToServer,
  setConnectionClosed,
  setConnectionFailed,
  receiveRawMessages,
} from '@app/actions/socket'
import { commands } from '@app/actions/commands'
import { messageReceivers } from '@app/actions/messages/incoming'
import { User } from '@app/utils/Message'
import { sendPongToServer, sendPrivmsg } from '@app/actions/messages/outgoing'

describe('reduce messages state', () => {
  //   const initialState = { ...messagesInitialState }
  const someone: User = { nick: 'someone', user: 'user', host: 'host' }
  const me: User = { nick: 'me', user: 'user', host: 'host' }
  const extraStates = { route: routeInitialState, server: serverInitialState }
  const route = {
    serverKey: 'serverKey',
    bufferKey: '#channel',
  }

  it('should handle CONNECT_TO_SERVER', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        connectToServer('serverKey', 'server'),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle CONNECTION_CLOSED', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        setConnectionClosed('serverKey'),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle CONNECTION_FAILED', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        setConnectionFailed('serverKey', 'Error', 'Connection failed'),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle PRINT_HELP_BY_DEFAULT', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        commands.help.callback(route),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle PRINT_HELP_ABOUT_COMMAND', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        commands.help.callback(route, 'help'),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RAW_MESSAGES_RECEIVED', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        receiveRawMessages('serverKey', [
          'PRIVMSG #channel :hello',
          'PRIVMSG #channel :world',
        ]),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_ERROR', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.ERROR('serverKey', 'server', ['Error message']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_JOIN', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.JOIN('serverKey', someone, ['#channel']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_NOTICE_FROM_SERVER', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.NOTICE('serverKey', 'server', [
          'server',
          'Notice from server',
        ]),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_NOTICE_FROM_CHANNEL', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.NOTICE('serverKey', someone, [
          '#channel',
          'Notice from channel',
        ]),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_NOTICE_FROM_USER', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.NOTICE('serverKey', someone, [
          'me',
          'Notice from user',
        ]),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PART', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.PART('serverKey', someone, ['#channel']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PART with message', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.PART('serverKey', someone, ['#channel', 'Goodbye!']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PING_FROM_SERVER', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.PING('serverKey', 'server', ['key']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle RECEIVE_PRIVMSG', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        messageReceivers.PRIVMSG('serverKey', someone, ['#channel', 'hello']),
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle SEND_PONG_TO_SERVER', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        sendPongToServer('serverKey', 'key').embeddedAction!,
        extraStates,
      ),
    ).toMatchSnapshot()
  })

  it('should handle SEND_PRIVMSG', () => {
    expect(
      reduceMessages(
        messagesInitialState,
        sendPrivmsg('serverKey', '#channel', 'hello').embeddedAction!,
        extraStates,
      ),
    ).toMatchSnapshot()
  })
})
