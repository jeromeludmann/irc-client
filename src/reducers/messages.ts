import { Action } from 'redux'
import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RawMessagesAction,
  CONNECTION_CLOSED,
  RAW_MESSAGES_RECEIVED,
  CONNECT_TO_SERVER,
  ConnectToServerAction,
} from '@app/actions/socket'
import {
  ReceiveErrorAction,
  ReceiveJoinAction,
  ReceivePartAction,
  ReceivePrivmsgAction,
  ReceiveNoticeFromServerAction,
  ReceiveNoticeFromChannelAction,
  ReceiveNoticeFromUserAction,
  RECEIVE_ERROR,
  RECEIVE_JOIN,
  RECEIVE_NOTICE_FROM_SERVER,
  RECEIVE_NOTICE_FROM_CHANNEL,
  RECEIVE_NOTICE_FROM_USER,
  RECEIVE_PART,
  RECEIVE_PRIVMSG,
  RECEIVE_PING_FROM_SERVER,
  RECEIVE_PONG_FROM_SERVER,
  ReceivePongFromServerAction,
} from '@app/actions/msgIncoming'
import {
  SEND_PONG_TO_SERVER,
  SEND_PRIVMSG,
  SendPrivmsgAction,
} from '@app/actions/msgOutgoing'
import {
  PRINT_HELP_BY_DEFAULT,
  PrintHelpByDefaultAction,
  PRINT_HELP_ABOUT_COMMAND,
  PrintHelpAboutCommandAction,
} from '@app/actions/commands'
import { RouteState } from '@app/reducers/route'
import { ServerState } from '@app/reducers/server'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'

// TODO replace string[] by MessageState[]
export type MessagesState = Readonly<string[]>

type MessagesReducer = (
  messages: MessagesState,
  action: Action,
  extraStates: { route: RouteState; server: ServerState },
) => MessagesState

export const messagesInitialState: MessagesState = []

const caseReducers: CaseReducerMap<MessagesReducer> = {
  [CONNECT_TO_SERVER]: (messages, action: ConnectToServerAction) => [
    ...messages,
    `Connecting to ${action.payload.host}…`,
  ],

  [CONNECTION_CLOSED]: messages => [
    ...messages,
    'Disconnected from remote host.',
  ],

  [CONNECTION_FAILED]: (
    messages,
    { payload: { message } }: ConnectionFailedAction,
  ) => [...messages, message],

  [PRINT_HELP_BY_DEFAULT]: (
    messages,
    { payload: { commands } }: PrintHelpByDefaultAction,
  ) => [
    ...messages,
    ...Object.keys(commands).map(
      commandName => `${commandName} - ${commands[commandName].description}`,
    ),
    'Type /HELP <command> for more details.',
  ],

  [PRINT_HELP_ABOUT_COMMAND]: (
    messages,
    { payload: { command } }: PrintHelpAboutCommandAction,
  ) => [
    ...messages,
    `Usage: /${command.name} ${command.syntax} - ${command.description}`,
  ],

  [RAW_MESSAGES_RECEIVED]: (messages, action: RawMessagesAction) => [
    ...messages,
    ...action.payload.messages,
  ],

  [RECEIVE_ERROR]: (messages, { payload: { message } }: ReceiveErrorAction) => [
    ...messages,
    message,
  ],

  [RECEIVE_JOIN]: (
    messages,
    { payload: { user, channel } }: ReceiveJoinAction,
  ) => [...messages, `${user.nick} has joined ${channel}`],

  [RECEIVE_NOTICE_FROM_SERVER]: (
    messages,
    action: ReceiveNoticeFromServerAction,
  ) => [...messages, action.payload.text],

  [RECEIVE_NOTICE_FROM_CHANNEL]: (
    messages,
    {
      payload: { user, text },
      route: { bufferKey },
    }: ReceiveNoticeFromChannelAction,
  ) => [...messages, `-${user.nick}/${bufferKey}- ${text}`],

  [RECEIVE_NOTICE_FROM_USER]: (
    messages,
    { payload: { user, text } }: ReceiveNoticeFromUserAction,
  ) => [...messages, `-${user.nick}- ${text}`],

  [RECEIVE_PART]: (
    messages,
    { payload: { user, channel, message } }: ReceivePartAction,
  ) => {
    const baseMsg = `${user.nick} has left ${channel}`
    return [...messages, message ? `${baseMsg} (${message})` : baseMsg]
  },

  [RECEIVE_PING_FROM_SERVER]: messages => [...messages, 'Ping?'],

  [RECEIVE_PONG_FROM_SERVER]: (
    messages,
    { payload: { key, lag } }: ReceivePongFromServerAction,
    {},
  ) => [...messages, `Response from server ${key} in ${lag} ms`],

  [RECEIVE_PRIVMSG]: (
    messages,
    { payload: { user, text } }: ReceivePrivmsgAction,
  ) => [...messages, `${user.nick}: ${text}`],

  [SEND_PONG_TO_SERVER]: messages => [...messages, 'Pong!'],

  [SEND_PRIVMSG]: (messages, action: SendPrivmsgAction, { server }) => [
    ...messages,
    `${server.user.nick}: ${action.payload.text}`,
  ],
}

export const reduceMessages: MessagesReducer = (
  messagesState = messagesInitialState,
  action,
  extraStates,
) =>
  action.type in caseReducers
    ? caseReducers[action.type](messagesState, action, extraStates)
    : messagesState
