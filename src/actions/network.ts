import { Action } from "redux";
import {
  RAW_BUFFER,
  Route,
  STATUS_BUFFER,
  ALL_BUFFERS,
  NO_BUFFER,
} from "@app/Route";

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
  route: { serverKey, bufferKey: NO_BUFFER },
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
        route: { serverKey, bufferKey: STATUS_BUFFER },
      }
    : {
        type: LOOKUP_SUCCESS,
        serverKey,
        payload: { address, family, host },
        route: { serverKey, bufferKey: STATUS_BUFFER },
      };
};

// Socket messages received

export const RAW_MESSAGES_RECEIVED = "SOCKET/RAW_MESSAGES_RECEIVED";

export interface RawMessagesReceivedAction
  extends NetworkAction<typeof RAW_MESSAGES_RECEIVED> {
  payload: { messages: string[] };
}

export const setRawMessagesReceived = (
  serverKey: string,
  messages: string[],
): RawMessagesReceivedAction => ({
  type: RAW_MESSAGES_RECEIVED,
  payload: { messages },
  route: { serverKey, bufferKey: RAW_BUFFER },
});

// Socket connection established

export const CONNECTION_ESTABLISHED = "SOCKET/CONNECTION_ESTABLISHED";

export interface ConnectionEstablishedAction
  extends NetworkAction<typeof CONNECTION_ESTABLISHED> {}

export const setConnectionEstablished = (
  serverKey: string,
): ConnectionEstablishedAction => ({
  type: CONNECTION_ESTABLISHED,
  route: { serverKey, bufferKey: STATUS_BUFFER },
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
  route: { serverKey, bufferKey: ALL_BUFFERS },
});

// Socket connection failed

export const CONNECTION_FAILED = "SOCKET/CONNECTION_FAILED";

export interface ConnectionFailedAction
  extends NetworkAction<typeof CONNECTION_FAILED> {
  payload: {
    name: string;
    message: string;
  };
}

export const setConnectionFailed = (
  serverKey: string,
  name: string,
  message: string,
): ConnectionFailedAction => ({
  type: CONNECTION_FAILED,
  payload: { name, message },
  route: { serverKey, bufferKey: ALL_BUFFERS },
});
