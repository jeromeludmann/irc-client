import { Action } from "redux";
import { mapReducer } from "@app/reducers/_map";
import {
  CONNECTION_FAILED,
  ConnectionFailedAction,
  RawMessagesAction,
  ConnectionClosedAction,
  CONNECTION_CLOSED,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/socket";
import {
  ErrorAction,
  JoinAction,
  PartAction,
  PrivmsgAction,
  NoticeFromServerAction,
  NoticeFromChannelAction,
  NoticeFromUserAction,
  PingFromServerAction,
  ERROR,
  JOIN,
  NOTICE_FROM_SERVER,
  NOTICE_FROM_CHANNEL,
  NOTICE_FROM_USER,
  PART,
  PRIVMSG,
  PING_FROM_SERVER,
  SendPongToServerAction,
  SEND_PONG_TO_SERVER,
  SEND_PRIVMSG,
  SendPrivmsgAction,
} from "@app/actions/messages";
import {
  PRINT_HELP_BY_DEFAULT,
  PrintHelpByDefaultAction,
  PRINT_HELP_ABOUT_COMMAND,
  PrintHelpAboutCommandAction,
} from "@app/actions/commands";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";

export type MessagesState = string[];

export const messagesInitialState: MessagesState = [];

type MessagesReducer<A = Action> = (
  messages: MessagesState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => MessagesState;

const connectionFailed: MessagesReducer<ConnectionFailedAction> = (
  messages,
  action,
) => {
  return [...messages, action.payload.message];
};

const connectionClosed: MessagesReducer<ConnectionClosedAction> = messages => {
  return [...messages, "Disconnected from remote host."];
};

const error: MessagesReducer<ErrorAction> = (messages, action) => {
  return [...messages, action.payload.message];
};

const join: MessagesReducer<JoinAction> = (messages, action) => {
  const { user, channel } = action.payload;
  const msg = `${user.nick} has joined ${channel}`;
  return [...messages, msg];
};

const part: MessagesReducer<PartAction> = (messages, action) => {
  const { user, channel, message } = action.payload;
  const baseMsg = `${user.nick} has left ${channel}`;
  const msg = message ? `${baseMsg} (${message})` : baseMsg;
  return [...messages, msg];
};

const printHelpByDefault: MessagesReducer<PrintHelpByDefaultAction> = (
  messages,
  action,
) => [
  ...messages,
  ...Object.keys(action.payload.commands).map(
    commandName =>
      `${commandName} - ${action.payload.commands[commandName].description}`,
  ),
  "Type /HELP <command> for more details.",
];

const printHelpAboutCommand: MessagesReducer<PrintHelpAboutCommandAction> = (
  messages,
  { payload: { command } },
) => [
  ...messages,
  `Usage: /${command.name} ${command.syntax} - ${command.description}`,
];

const privmsg: MessagesReducer<PrivmsgAction> = (messages, action) => {
  const { user, text } = action.payload;
  const msg = `${user.nick}: ${text}`;
  return [...messages, msg];
};

const raw: MessagesReducer<RawMessagesAction> = (messages, action) => {
  return [...messages, ...action.payload.messages];
};

const noticeFromServer: MessagesReducer<NoticeFromServerAction> = (
  messages,
  action,
) => {
  return [...messages, action.payload.text];
};

const noticeFromChannel: MessagesReducer<NoticeFromChannelAction> = (
  messages,
  action,
) => {
  const { user, text } = action.payload;
  const { channelKey } = action.route;
  return [...messages, `-${user.nick}/${channelKey}- ${text}`];
};

const noticeFromUser: MessagesReducer<NoticeFromUserAction> = (
  messages,
  action,
) => {
  const { user, text } = action.payload;
  return [...messages, `-${user.nick}- ${text}`];
};

const receivePingFromServer: MessagesReducer<
  PingFromServerAction
> = messages => {
  return [...messages, "Ping?"];
};

const sendPongToServer: MessagesReducer<SendPongToServerAction> = messages => {
  return [...messages, "Pong!"];
};

const sendPrivmsg: MessagesReducer<SendPrivmsgAction> = (
  messages,
  action,
  { user: { nick } },
) => {
  return [...messages, `${nick}: ${action.payload.text}`];
};

export const reduceMessages = mapReducer<
  MessagesState,
  { route: RouteState; user: UserState }
>({
  [CONNECTION_FAILED]: connectionFailed,
  [CONNECTION_CLOSED]: connectionClosed,
  [ERROR]: error,
  [JOIN]: join,
  [NOTICE_FROM_SERVER]: noticeFromServer,
  [NOTICE_FROM_CHANNEL]: noticeFromChannel,
  [NOTICE_FROM_USER]: noticeFromUser,
  [PART]: part,
  [PRINT_HELP_BY_DEFAULT]: printHelpByDefault,
  [PRINT_HELP_ABOUT_COMMAND]: printHelpAboutCommand,
  [PRIVMSG]: privmsg,
  [PING_FROM_SERVER]: receivePingFromServer,
  [RAW_MESSAGES_RECEIVED]: raw,
  [SEND_PONG_TO_SERVER]: sendPongToServer,
  [SEND_PRIVMSG]: sendPrivmsg,
});
