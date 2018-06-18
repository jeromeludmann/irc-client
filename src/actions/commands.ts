import { Action } from "redux";

export const COMMAND_RAW = "COMMAND/RAW";

export interface CommandAction extends Action<typeof COMMAND_RAW> {
  serverKey: string;
  payload: { raw: string };
}

export type CommandActionCreator = (
  serverKey: string,
  ...args: string[]
) => CommandAction;

export const sendRawMessage = (
  serverKey: string,
  message: string,
): CommandAction => ({
  type: COMMAND_RAW,
  serverKey,
  payload: { raw: message },
});

export const join: CommandActionCreator = (serverKey, channel) =>
  sendRawMessage(serverKey, `JOIN ${channel}`);

export const nick: CommandActionCreator = (serverKey, nickname) =>
  sendRawMessage(serverKey, `NICK :${nickname}`);

export const pong: CommandActionCreator = (serverKey, key) =>
  sendRawMessage(serverKey, `PONG :${key}`);

export const user: CommandActionCreator = (
  serverKey,
  username,
  realname,
  mode = "0",
) => sendRawMessage(serverKey, `USER ${username} ${mode} * :${realname}`);

export const whois: CommandActionCreator = (serverKey, nickname) =>
  sendRawMessage(serverKey, `WHOIS ${nickname}`);
