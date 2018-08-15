import { Action } from "redux";
import {
  connectServer,
  disconnectServer,
  DisconnectServerAction,
  ConnectServerAction,
  SendRawMessageAction,
  sendRawMessage,
} from "@app/actions/socket";
import { closeWindow, CloseWindowAction } from "@app/actions/ui";
import { Route, RoutedAction, STATUS, BROADCAST_ACTIVE } from "@app/Route";
import { CHANNEL_REGEXP } from "@app/helpers";
import {
  sendJoin,
  sendPrivmsg,
  sendPart,
  SendPrivmsgAction,
  sendNick,
} from "@app/actions/messages";

export type Command<A = Action<string>> = {
  description: string;
  syntax: string;
  regexp: RegExp;
  callback: (route: Route, ...params: string[]) => A;
};

type CommandRegistry = { [command: string]: Command };

export const PRINT_HELP_BY_DEFAULT = "COMMAND/PRINT_HELP_BY_DEFAULT";
export const PRINT_HELP_ABOUT_COMMAND = "COMMAND/PRINT_HELP_ABOUT_COMMAND";

export interface PrintHelpByDefaultAction
  extends RoutedAction<typeof PRINT_HELP_BY_DEFAULT> {
  payload: { commands: CommandRegistry };
}

export interface PrintHelpAboutCommandAction
  extends RoutedAction<typeof PRINT_HELP_ABOUT_COMMAND> {
  payload: { command: Command & { name: string } };
}

export const commands: CommandRegistry = {
  close: {
    description: "Closes the current window",
    syntax: "",
    regexp: /\s*/,
    callback: (route): CloseWindowAction => closeWindow(route),
  },

  help: {
    description: "Prints help about available commands",
    syntax: "[command]",
    regexp: /^(\S+)?$/,
    callback: (
      route,
      commandName?,
    ): PrintHelpAboutCommandAction | PrintHelpByDefaultAction => {
      if (commandName) {
        commandName = commandName.toLowerCase();
      }

      if (commandName && commands.hasOwnProperty(commandName)) {
        return {
          type: PRINT_HELP_ABOUT_COMMAND,
          payload: { command: { ...commands[commandName], name: commandName } },
          route: { ...route, channelKey: BROADCAST_ACTIVE },
        };
      }

      return {
        type: PRINT_HELP_BY_DEFAULT,
        payload: { commands },
        route: { ...route, channelKey: STATUS },
      };
    },
  },

  join: {
    description: "Joins a channel",
    syntax: "<channel>",
    regexp: CHANNEL_REGEXP,
    callback: (route, channel): SendRawMessageAction =>
      sendJoin(route.serverKey, channel),
  },

  msg: {
    description: "Sends a message to a channel or a nick",
    syntax: "<channel or nick> <text>",
    regexp: /^(\S+)\s+(.+)$/,
    callback: (route, channel, text): SendRawMessageAction<SendPrivmsgAction> =>
      sendPrivmsg(route.serverKey, channel, text),
  },

  nick: {
    description: "Changes the current nick",
    syntax: "<nick>",
    regexp: /^(\S+)$/,
    callback: (route, nick): SendRawMessageAction =>
      sendNick(route.serverKey, nick),
  },

  part: {
    description: "Leaves the channel",
    syntax: "<channel> [text]",
    regexp: /^(\S+)(?:\s+(.+))?$/,
    callback: (route, channel, text): SendRawMessageAction =>
      sendPart(route.serverKey, channel, text),
  },

  server: {
    description: "Connects to a server",
    syntax: "[-n] <host> [port]",
    regexp: /^(?:(-n)\s+)?(\S+)(?:\s+(\d{1,5})?)?$/,
    callback: (route, option, host, port?): ConnectServerAction =>
      connectServer(
        route.serverKey,
        host,
        port ? +port : undefined,
        option === "-n",
      ),
  },

  quit: {
    description: "Disconnects from the current server",
    syntax: "[quit message]",
    regexp: /^(.*)$/,
    callback: (route, quitMessage?): DisconnectServerAction =>
      disconnectServer(route.serverKey, quitMessage),
  },

  raw: {
    description: "Sends a raw message",
    syntax: "<raw message>",
    regexp: /^(.+)$/,
    callback: (route, message): SendRawMessageAction =>
      sendRawMessage(route.serverKey, message),
  },
};

// aliases
commands.quote = commands.raw;
