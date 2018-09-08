import { Action } from "redux";
import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RawMessagesAction,
  CONNECTION_CLOSED,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/socket";
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
} from "@app/actions/msgIncoming";
import {
  SEND_PONG_TO_SERVER,
  SEND_PRIVMSG,
  SendPrivmsgAction,
} from "@app/actions/msgOutgoing";
import {
  PRINT_HELP_BY_DEFAULT,
  PrintHelpByDefaultAction,
  PRINT_HELP_ABOUT_COMMAND,
  PrintHelpAboutCommandAction,
} from "@app/actions/commands";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";
import { RoutedAction } from "@app/Route";

// TODO replace string[] by MessageState[]
export type MessagesState = Readonly<string[]>;

export const messagesInitialState: MessagesState = [];

const handlers: {
  [action: string]: (
    messages: MessagesState,
    action: Action,
    extraStates: { route: RouteState; user: UserState },
  ) => MessagesState;
} = {
  [CONNECTION_CLOSED]: messages => [
    ...messages,
    "Disconnected from remote host.",
  ],

  [CONNECTION_FAILED]: (
    messages,
    { payload: { message } }: ConnectionFailedAction,
  ) => [...messages, message],

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
      route: { channelKey },
    }: ReceiveNoticeFromChannelAction,
  ) => [...messages, `-${user.nick}/${channelKey}- ${text}`],

  [RECEIVE_NOTICE_FROM_USER]: (
    messages,
    { payload: { user, text } }: ReceiveNoticeFromUserAction,
  ) => [...messages, `-${user.nick}- ${text}`],

  [RECEIVE_PART]: (
    messages,
    { payload: { user, channel, message } }: ReceivePartAction,
  ) => {
    const baseMsg = `${user.nick} has left ${channel}`;
    return [...messages, message ? `${baseMsg} (${message})` : baseMsg];
  },

  [RECEIVE_PONG_FROM_SERVER]: (
    messages,
    { payload: { key, lag } }: ReceivePongFromServerAction,
    {},
  ) => [...messages, `Response from server ${key} in ${lag} ms`],

  [PRINT_HELP_BY_DEFAULT]: (
    messages,
    { payload: { commands } }: PrintHelpByDefaultAction,
  ) => [
    ...messages,
    ...Object.keys(commands).map(
      commandName => `${commandName} - ${commands[commandName].description}`,
    ),
    "Type /HELP <command> for more details.",
  ],

  [PRINT_HELP_ABOUT_COMMAND]: (
    messages,
    { payload: { command } }: PrintHelpAboutCommandAction,
  ) => [
    ...messages,
    `Usage: /${command.name} ${command.syntax} - ${command.description}`,
  ],

  [RECEIVE_PRIVMSG]: (
    messages,
    { payload: { user, text } }: ReceivePrivmsgAction,
  ) => [...messages, `${user.nick}: ${text}`],

  [RECEIVE_PING_FROM_SERVER]: messages => [...messages, "Ping?"],

  [RAW_MESSAGES_RECEIVED]: (messages, action: RawMessagesAction) => [
    ...messages,
    ...action.payload.messages,
  ],

  [SEND_PONG_TO_SERVER]: messages => [...messages, "Pong!"],

  [SEND_PRIVMSG]: (messages, action: SendPrivmsgAction, { user: { nick } }) => [
    ...messages,
    `${nick}: ${action.payload.text}`,
  ],
};

export const reduceMessages = (
  messagesState = messagesInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](messagesState, action, extraStates)
    : messagesState;
