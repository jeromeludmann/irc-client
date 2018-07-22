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
import { closeWindow } from "@app/actions/ui";
import { Route, RoutedAction, STATUS } from "@app/Route";

export type Command<A = Action<string>> = {
  description: string;
  syntax: string;
  regexp: RegExp;
  callback: (route: Route, ...args: string[]) => A;
};

type CommandRegistry = { [command: string]: Command };

// close

export const close: Command = {
  description: "Closes the current window",
  syntax: "",
  regexp: /\s*/,
  callback: route => closeWindow(route),
};

// connect

export const connect: Command<ConnectServerAction> = {
  description: "Connects to a server",
  syntax: "[-n] <host> [port]",
  regexp: /^(?:(-n)\s+)?(\S+)(?:\s+(\d{1,5})?)?$/,
  callback: (route, option, host, port?) =>
    connectServer(
      route.serverKey,
      host,
      port ? +port : undefined,
      option === "-n",
    ),
};

// disconnect

export const disconnect: Command<DisconnectServerAction> = {
  description: "Disconnects from the current server",
  syntax: "[quit message]",
  regexp: /^(.*)$/,
  callback: (route, quitMessage?) =>
    disconnectServer(route.serverKey, quitMessage),
};

// help

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

export const help: Command<
  PrintHelpByDefaultAction | PrintHelpAboutCommandAction
> = {
  description: "Prints help about available commands",
  syntax: "[command]",
  regexp: /^(\S+)?$/,
  callback: (route, commandName?) => {
    if (commandName) {
      commandName = commandName.toLowerCase();
    }

    if (commandName && registry.hasOwnProperty(commandName)) {
      return {
        type: PRINT_HELP_ABOUT_COMMAND,
        payload: { command: { ...registry[commandName], name: commandName } },
        route: { ...route, channelKey: STATUS },
      };
    }

    return {
      type: PRINT_HELP_BY_DEFAULT,
      payload: { commands: registry },
      route: { ...route, channelKey: STATUS },
    };
  },
};

// join

export const join: Command<SendRawMessageAction> = {
  description: "Joins a channel",
  syntax: "<channel>",
  regexp: /^([&|#|\+|!]\S+)$/, // TODO extract (see Route.ts)
  callback: (route, channel) => sendMessage(route.serverKey, "join", channel),
};

// msg

export const msg: Command<SendRawMessageAction> = {
  description: "Sends a message to a channel or a nick",
  syntax: "<channel or nick> <text>",
  regexp: /^(\S+)\s+(.+)$/,
  callback: (route, channel, text) =>
    sendMessage(route.serverKey, "privmsg", channel, text),
};

// part

export const part: Command<SendRawMessageAction> = {
  description: "Leaves the channel",
  syntax: "<channel> [text]",
  regexp: /^(\S+)(?:\s+(.+))?$/,
  callback: (route, channel, text) =>
    sendMessage(route.serverKey, "part", channel, text),
};

// quit

export const quit: Command<SendRawMessageAction> = {
  description: "Disconnects from the current server",
  syntax: "[quit message]",
  regexp: /^(.*)$/,
  callback: (route, text) => sendMessage(route.serverKey, "quit", text),
};

// raw (quote)

export const raw: Command<SendRawMessageAction> = {
  description: "Sends a raw message",
  syntax: "<raw message>",
  regexp: /^(.+)$/,
  callback: (route, message) => sendRaw(route.serverKey, message),
};

export const registry: CommandRegistry = {
  close,
  connect,
  disconnect,
  help,
  join,
  msg,
  part,
  quit,
  quote: raw,
  raw,
};
