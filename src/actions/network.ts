import { Action } from "redux";
import { RAW, Route, STATUS, BROADCAST, NONE } from "@app/Route";

export interface NetworkAction<T> extends Action<T> {
  route: Route;
}

// Connect to server

export const CONNECT_SERVER = "SERVER/CONNECT_SERVER";

export interface ConnectServerAction extends Action<typeof CONNECT_SERVER> {
  payload: {
    host: string;
    port: number;
  };
}

export const connectServer = (
  host: string,
  port: number = 6667,
): ConnectServerAction => ({
  type: CONNECT_SERVER,
  payload: { host, port },
});

// Disconnect from server

export const DISCONNECT_SERVER = "SERVER/DISCONNECT_SERVER";

export interface DisconnectServerAction
  extends NetworkAction<typeof DISCONNECT_SERVER> {}

export const disconnectServer = (
  serverKey: string,
): DisconnectServerAction => ({
  type: DISCONNECT_SERVER,
  route: { serverKey, channelKey: NONE },
});

// Socket lookup

export const LOOKUP_SUCCESS = "SOCKET/LOOKUP_SUCCESS";

export const LOOKUP_FAILED = "SOCKET/LOOKUP_FAILED";

export interface LookupSuccessAction
  extends NetworkAction<typeof LOOKUP_SUCCESS> {
  serverKey: string;
  payload: {
    address: string;
    family: string | number | null;
    host: string;
  };
}

export interface LookupFailedAction
  extends NetworkAction<typeof LOOKUP_FAILED> {
  serverKey: string;
  payload: { error: Error };
}

export const lookup = (
  serverKey: string,
  error: Error | null,
  address: string,
  family: string | number | null,
  host: string,
): LookupSuccessAction | LookupFailedAction => {
  return error
    ? {
        type: LOOKUP_FAILED,
        serverKey,
        payload: { error },
        route: { serverKey, channelKey: STATUS },
      }
    : {
        type: LOOKUP_SUCCESS,
        serverKey,
        payload: { address, family, host },
        route: { serverKey, channelKey: STATUS },
      };
};

// Socket messages received

export const RAW_MESSAGES = "SOCKET/RECEIVE_RAW_MESSAGES";

export interface ReceiveRawMessagesAction
  extends NetworkAction<typeof RAW_MESSAGES> {
  payload: { messages: string[] };
}

export const receiveRawMessages = (
  serverKey: string,
  messages: string[],
): ReceiveRawMessagesAction => ({
  type: RAW_MESSAGES,
  payload: { messages },
  route: { serverKey, channelKey: RAW },
});

// Socket connection established

export const CONNECTION_ESTABLISHED = "SOCKET/CONNECTION_ESTABLISHED";

export interface ConnectionEstablishedAction
  extends NetworkAction<typeof CONNECTION_ESTABLISHED> {}

export const setConnectionEstablished = (
  serverKey: string,
): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
  route: { serverKey, channelKey: STATUS },
});

// Socket connection closed

export const CONNECTION_CLOSED = "SOCKET/CONNECTION_CLOSED";

export interface ConnectionClosedAction
  extends NetworkAction<typeof CONNECTION_CLOSED> {
  payload: { hadError: boolean };
}

export const setConnectionClosed = (
  serverKey: string,
  hadError: boolean,
): ConnectionClosedAction => ({
  type: CONNECTION_CLOSED,
  payload: { hadError },
  route: { serverKey, channelKey: BROADCAST },
});

// Socket connection failed

export const CONNECTION_FAILED = "SOCKET/CONNECTION_FAILED";

export interface ConnectionFailedAction
  extends NetworkAction<typeof CONNECTION_FAILED> {
  payload: {
    name: string;
    message: string;
    stack?: string;
  };
}

export const setConnectionFailed = (
  serverKey: string,
  name: string,
  message: string,
  stack?: string,
): ConnectionFailedAction => ({
  type: CONNECTION_FAILED,
  payload: { name, message, stack },
  route: { serverKey, channelKey: BROADCAST },
});
