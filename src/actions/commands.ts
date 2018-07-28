import { Action } from "redux";
import {
  connectServer,
  disconnectServer,
  sendMessage,
  sendRaw,
  DisconnectServerAction,
  ConnectServerAction,
  SendRawMessageAction,
} from "@app/actions/socket";
import { closeWindow, CloseWindowAction } from "@app/actions/ui";
import { Route, RoutedAction, STATUS } from "@app/Route";
import { CHANNEL_REGEXP } from "@app/helpers";

export type Command<A = Action<string>> = {
  description: string;
  syntax: string;
  regexp: RegExp;
  callback: (route: Route, ...args: string[]) => A;
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

  connect: {
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

  disconnect: {
    description: "Disconnects from the current server",
    syntax: "[quit message]",
    regexp: /^(.*)$/,
    callback: (route, quitMessage?): DisconnectServerAction =>
      disconnectServer(route.serverKey, quitMessage),
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
          route: { ...route, channelKey: STATUS },
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
      sendMessage(route.serverKey, "join", channel),
  },

  msg: {
    description: "Sends a message to a channel or a nick",
    syntax: "<channel or nick> <text>",
    regexp: /^(\S+)\s+(.+)$/,
    callback: (route, channel, text): SendRawMessageAction =>
      sendMessage(route.serverKey, "privmsg", channel, text),
  },

  part: {
    description: "Leaves the channel",
    syntax: "<channel> [text]",
    regexp: /^(\S+)(?:\s+(.+))?$/,
    callback: (route, channel, text): SendRawMessageAction =>
      sendMessage(route.serverKey, "part", channel, text),
  },

  quit: {
    description: "Disconnects from the current server",
    syntax: "[quit message]",
    regexp: /^(.*)$/,
    callback: (route, text): SendRawMessageAction =>
      sendMessage(route.serverKey, "quit", text),
  },

  raw: {
    description: "Sends a raw message",
    syntax: "<raw message>",
    regexp: /^(.+)$/,
    callback: (route, message): SendRawMessageAction =>
      sendRaw(route.serverKey, message),
  },
};

// aliases
commands.quote = commands.raw;
