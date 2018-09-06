import { Action } from "redux";
import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RawMessagesAction,
  CONNECTION_CLOSED,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/socket";
import {
  ErrorReceivedAction,
  JoinReceivedAction,
  PartReceivedAction,
  PrivmsgReceivedAction,
  NoticeFromServerReceivedAction,
  NoticeFromChannelReceivedAction,
  NoticeFromUserReceivedAction,
  ERROR_RECEIVED,
  JOIN_RECEIVED,
  NOTICE_FROM_SERVER_RECEIVED,
  NOTICE_FROM_CHANNEL_RECEIVED,
  NOTICE_FROM_USER_RECEIVED,
  PART_RECEIVED,
  PRIVMSG_RECEIVED,
  PING_FROM_SERVER_RECEIVED,
  SEND_PONG_TO_SERVER,
  SEND_PRIVMSG,
  SendPrivmsgAction,
  PONG_FROM_SERVER_RECEIVED,
  PongFromServerReceivedAction,
} from "@app/actions/messages";
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
export type MessagesState = string[];

export const messagesInitialState: MessagesState = [];

type MessagesReducer<A = Action> = (
  messages: MessagesState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => MessagesState;

const handlers: { [action: string]: MessagesReducer } = {
  [CONNECTION_CLOSED]: messages => [
    ...messages,
    "Disconnected from remote host.",
  ],

  [CONNECTION_FAILED]: (
    messages,
    { payload: { message } }: ConnectionFailedAction,
  ) => [...messages, message],

  [ERROR_RECEIVED]: (
    messages,
    { payload: { message } }: ErrorReceivedAction,
  ) => [...messages, message],

  [JOIN_RECEIVED]: (
    messages,
    { payload: { user, channel } }: JoinReceivedAction,
  ) => [...messages, `${user.nick} has joined ${channel}`],

  [NOTICE_FROM_SERVER_RECEIVED]: (
    messages,
    action: NoticeFromServerReceivedAction,
  ) => [...messages, action.payload.text],

  [NOTICE_FROM_CHANNEL_RECEIVED]: (
    messages,
    {
      payload: { user, text },
      route: { channelKey },
    }: NoticeFromChannelReceivedAction,
  ) => [...messages, `-${user.nick}/${channelKey}- ${text}`],

  [NOTICE_FROM_USER_RECEIVED]: (
    messages,
    { payload: { user, text } }: NoticeFromUserReceivedAction,
  ) => [...messages, `-${user.nick}- ${text}`],

  [PART_RECEIVED]: (
    messages,
    { payload: { user, channel, message } }: PartReceivedAction,
  ) => {
    const baseMsg = `${user.nick} has left ${channel}`;
    return [...messages, message ? `${baseMsg} (${message})` : baseMsg];
  },

  [PONG_FROM_SERVER_RECEIVED]: (
    messages,
    { payload: { key, lag } }: PongFromServerReceivedAction,
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

  [PRIVMSG_RECEIVED]: (
    messages,
    { payload: { user, text } }: PrivmsgReceivedAction,
  ) => [...messages, `${user.nick}: ${text}`],

  [PING_FROM_SERVER_RECEIVED]: messages => [...messages, "Ping?"],

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
