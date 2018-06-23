import { Action } from "redux";

export const SEND_MESSAGE = "MESSAGE/OUTGOING";

export interface OutgoingMessageAction extends Action<typeof SEND_MESSAGE> {
  serverKey: string;
  payload: { raw: string };
}

export const sendRaw = (
  serverKey: string,
  message: string,
): OutgoingMessageAction => ({
  type: SEND_MESSAGE,
  serverKey,
  payload: { raw: message },
});

export const sendJoin = (
  serverKey: string,
  channel: string,
): OutgoingMessageAction => sendRaw(serverKey, `JOIN ${channel}`);

export const sendNick = (
  serverKey: string,
  nickname: string,
): OutgoingMessageAction => sendRaw(serverKey, `NICK :${nickname}`);

export const sendPong = (
  serverKey: string,
  key: string,
): OutgoingMessageAction => sendRaw(serverKey, `PONG :${key}`);

export const sendPrivmsg = (
  serverKey: string,
  target: string,
  text: string,
): OutgoingMessageAction => sendRaw(serverKey, `PRIVMSG ${target} :${text}`);

export const sendUser = (
  serverKey: string,
  username: string,
  realname: string,
  mode = 0,
) => sendRaw(serverKey, `USER ${username} ${mode} * :${realname}`);

export const sendWhois = (
  serverKey: string,
  nickname: string,
): OutgoingMessageAction => sendRaw(serverKey, `WHOIS ${nickname}`);
