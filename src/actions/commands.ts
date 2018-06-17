import { Action } from "redux";

export const SEND_COMMAND = "COMMAND/SEND";

export interface CommandAction extends Action<typeof SEND_COMMAND> {
  payload: { command: string };
}

export function raw(command: string): CommandAction {
  return { type: SEND_COMMAND, payload: { command } };
}

export function join(channel: string) {
  return raw(`JOIN ${channel}`);
}

export function nick(nickname: string) {
  return raw(`NICK ${nickname}`);
}

export function part(channel: string, text?: string) {
  return raw(text ? `PART ${channel} :${text}` : `PART ${channel}`);
}

export function pong(key: string) {
  return raw(`PONG :${key}`);
}

export function user(username: string, realname: string, mode: number = 0) {
  return raw(`USER ${username} ${mode} * :${realname}`);
}

export function whois(nickname: string) {
  return raw(`WHOIS ${nickname}`);
}
