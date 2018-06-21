import { Action } from "redux";

export const OUTGOING_MESSAGE = "MESSAGE/OUTGOING";

export interface OutgoingMessageAction extends Action<typeof OUTGOING_MESSAGE> {
  serverKey: string;
  payload: { raw: string };
}

export const raw = (
  serverKey: string,
  message: string,
): OutgoingMessageAction => ({
  type: OUTGOING_MESSAGE,
  serverKey,
  payload: { raw: message },
});

export const join = (
  serverKey: string,
  channel: string,
): OutgoingMessageAction => raw(serverKey, `JOIN ${channel}`);

export const nick = (
  serverKey: string,
  nickname: string,
): OutgoingMessageAction => raw(serverKey, `NICK :${nickname}`);

export const pong = (serverKey: string, key: string): OutgoingMessageAction =>
  raw(serverKey, `PONG :${key}`);

export const privmsg = (
  serverKey: string,
  target: string,
  text: string,
): OutgoingMessageAction => raw(serverKey, `PRIVMSG ${target} :${text}`);

export const user = (
  serverKey: string,
  username: string,
  realname: string,
  mode = 0,
) => raw(serverKey, `USER ${username} ${mode} * :${realname}`);

export const whois = (
  serverKey: string,
  nickname: string,
): OutgoingMessageAction => raw(serverKey, `WHOIS ${nickname}`);
