import { Action } from "redux";

export const LOOKUP_SUCCESS = "SOCKET/LOOKUP_SUCCESS";
export const LOOKUP_FAILED = "SOCKET/LOOKUP_FAILED";
export const MESSAGES_RECEIVED = "SOCKET/RECEIVE_MESSAGES";
export const CONNECTION_ESTABLISHED = "SOCKET/CONNECTION_ESTABLISHED";
export const CONNECTION_CLOSED = "SOCKET/CONNECTION_CLOSED";
export const CONNECTION_FAILED = "SOCKET/CONNECTION_FAILED";

export type LookupSuccessAction = Action<typeof LOOKUP_SUCCESS> & {
  address: string;
  family: string | number | null;
  host: string;
};

export type LookupFailedAction = Action<typeof LOOKUP_FAILED> & {
  error: Error;
};

export type MessagesReceivedAction = Action<typeof MESSAGES_RECEIVED> & {
  payload: {
    serverId: string;
    messages: string[];
  };
};

export type ConnectionEstablishedAction = Action<typeof CONNECTION_ESTABLISHED>;

export type ConnectionClosedAction = Action<typeof CONNECTION_CLOSED> & {
  payload: {
    hadError: boolean;
  };
};

export type ConnectionFailedAction = Action<typeof CONNECTION_FAILED> & {
  payload: {
    name: string;
    message: string;
  };
};

export const lookup = (
  error: Error | null,
  address: string,
  family: string | number | null,
  host: string,
): LookupSuccessAction | LookupFailedAction => {
  return error
    ? { type: LOOKUP_FAILED, error }
    : { type: LOOKUP_SUCCESS, address, family, host };
};

export const setMessagesReceived = (
  serverId: string,
  messages: string[],
): MessagesReceivedAction => ({
  type: MESSAGES_RECEIVED,
  payload: { serverId, messages },
});

export const setConnectionEstablished = (): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
});

export const setConnectionClosed = (
  hadError: boolean,
): ConnectionClosedAction => ({
  type: CONNECTION_CLOSED,
  payload: { hadError },
});

export const setConnectionFailed = (
  name: string,
  message: string,
): ConnectionFailedAction => ({
  type: CONNECTION_FAILED,
  payload: { name, message },
});
