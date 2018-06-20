import { Action } from "redux";
import { Route } from "@app/Route";

export interface MessageAction<T, M> extends Action<T> {
  payload: M;
  route: Route;
}

export type MessageActionCreator<A, P = Prefix> = (
  serverKey: string,
  prefix: P,
  params: string[],
) => A;

export type Prefix = Server | User;

export type Server = string;

export type User = {
  nick: string;
  user: string;
  host: string;
};

export const isChannel = (channel: string) => /^(&|#|\+|!)/.test(channel);

export const isPrefixServer = (prefix: Prefix) => typeof prefix === "string";

export const isPrefixUser = (prefix: Prefix) => !isPrefixServer(prefix);
