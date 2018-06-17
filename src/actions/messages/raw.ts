import { Action } from "redux";

export interface Raw {
  prefix?: Prefix;
  command: string;
  params: string[];
}

const MESSAGE_RAW = "MESSAGE/RAW";

interface RawMessageAction<T = typeof MESSAGE_RAW, M = Raw> extends Action<T> {
  payload: M;
}

export interface MessageAction<T, M> extends RawMessageAction<T, M> {
  route: { channel: string };
}

export type MessageActionCreator<A, P = Prefix> = (
  prefix: P,
  params: string[],
) => A;

export type Prefix = Server | User;

export type Server = string;

export type User = { nick: string; user: string; host: string };

export const isChannel = (channel: string) => channel.charAt(0) === "#";

export const isPrefixServer = (prefix: Prefix) => typeof prefix === "string";

export const isPrefixUser = (prefix: Prefix) => !isPrefixServer(prefix);

export const rawReceived = (rawMessage: Raw): RawMessageAction => ({
  type: MESSAGE_RAW,
  payload: rawMessage,
});
