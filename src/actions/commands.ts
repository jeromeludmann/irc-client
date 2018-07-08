import { Action } from "redux";
import {
  connectServer,
  disconnectServer,
  sendMessage,
  sendRaw,
} from "@app/actions/socket";
import { closeWindow } from "@app/actions/ui";
import { Route } from "@app/Route";

export type Command = {
  syntax: string;
  regexp: RegExp;
  callback: (route: Route, ...args: string[]) => Action<string>;
};

/**
 * Command: /close
 *
 * Close current window.
 */
export const close: Command = {
  syntax: "(no required args)",
  regexp: /\s*/,
  callback: route => closeWindow(route),
};

/**
 * Command: /connect
 *
 * Connect to a server.
 */
export const connect: Command = {
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

/**
 * Command: /disconnect
 *
 * Disconnect from a server.
 */
export const disconnect: Command = {
  syntax: "[quit message]",
  regexp: /^(\S+)?$/,
  callback: (route, quitMessage?) =>
    disconnectServer(route.serverKey, quitMessage),
};

/**
 * Command: /join
 *
 * Join a channel.
 */
export const join: Command = {
  syntax: "<channel>",
  regexp: /^([&|#|\+|!]\S+)$/,
  callback: (route, channel) => sendMessage(route.serverKey, "join", channel),
};

/**
 * Command: /msg
 *
 * Send a message to a channel or a nickname.
 */
export const msg: Command = {
  syntax: "<channel or nick> <text>",
  regexp: /^(\S+)\s+(.+)$/,
  callback: (route, channel, text) =>
    sendMessage(route.serverKey, "privmsg", channel, text),
};

/**
 * Command: /part
 *
 * Part from a channel.
 */
export const part: Command = {
  syntax: "<channel> [text]",
  regexp: /^(\S+)(?:\s+(.+))?$/,
  callback: (route, channel, text) =>
    sendMessage(route.serverKey, "part", channel, text),
};

/**
 * Command: /quit
 *
 * Quit a server.
 */
export const quit: Command = {
  syntax: "<quit message>",
  regexp: /^(.*)$/,
  callback: (route, text) => sendMessage(route.serverKey, "quit", text),
};

/**
 * Command: /raw
 * Command: /quote
 *
 * Send a raw message.
 */
export const raw: Command = {
  syntax: "<raw message>",
  regexp: /^(.+)$/,
  callback: (route, message) => sendRaw(route.serverKey, message),
};
