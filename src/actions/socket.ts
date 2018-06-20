import { Action } from "redux";
import { RAW_WINDOW, Route } from "@app/Route";

export const LOOKUP_SUCCESS = "SOCKET/LOOKUP_SUCCESS";
export const LOOKUP_FAILED = "SOCKET/LOOKUP_FAILED";
export const RAW_MESSAGES_RECEIVED = "SOCKET/RAW_MESSAGES_RECEIVED";
export const CONNECTION_ESTABLISHED = "SOCKET/CONNECTION_ESTABLISHED";
export const CONNECTION_CLOSED = "SOCKET/CONNECTION_CLOSED";
export const CONNECTION_FAILED = "SOCKET/CONNECTION_FAILED";

// TODO add route to all actions
// TODO move route to abstract interface

export type LookupSuccessAction = Action<typeof LOOKUP_SUCCESS> & {
  serverKey: string;
  payload: { address: string; family: string | number | null; host: string };
};

export type LookupFailedAction = Action<typeof LOOKUP_FAILED> & {
  serverKey: string;
  payload: { error: Error };
};

export type RawMessagesReceivedAction = Action<typeof RAW_MESSAGES_RECEIVED> & {
  payload: { messages: string[] };
  route: Route;
};

export type ConnectionEstablishedAction = Action<
  typeof CONNECTION_ESTABLISHED
> & {
  serverKey: string;
};

export type ConnectionClosedAction = Action<typeof CONNECTION_CLOSED> & {
  serverKey: string;
  payload: { hadError: boolean };
};

export type ConnectionFailedAction = Action<typeof CONNECTION_FAILED> & {
  serverKey: string;
  payload: { name: string; message: string };
};

export const lookup = (
  serverKey: string,
  error: Error | null,
  address: string,
  family: string | number | null,
  host: string,
): LookupSuccessAction | LookupFailedAction => {
  return error
    ? { type: LOOKUP_FAILED, serverKey, payload: { error } }
    : { type: LOOKUP_SUCCESS, serverKey, payload: { address, family, host } };
};

export const setRawMessagesReceived = (
  serverKey: string,
  messages: string[],
): RawMessagesReceivedAction => ({
  type: RAW_MESSAGES_RECEIVED,
  payload: { messages },
  route: { server: serverKey, window: RAW_WINDOW },
});

export const setConnectionEstablished = (
  serverKey: string,
): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
  serverKey,
});

export const setConnectionClosed = (
  serverKey: string,
  hadError: boolean,
): ConnectionClosedAction => ({
  type: CONNECTION_CLOSED,
  serverKey,
  payload: { hadError },
});

export const setConnectionFailed = (
  serverKey: string,
  name: string,
  message: string,
): ConnectionFailedAction => ({
  type: CONNECTION_FAILED,
  serverKey,
  payload: { name, message },
});
