import { Action } from "redux";
import { RAW, Route, STATUS, BROADCAST_ALL, BROADCAST_NONE } from "@app/Route";

export interface NetworkAction<T> extends Action<T> {
  route: Route;
}

// Connect to server

export const CONNECT_SERVER = "SOCKET/CONNECT_SERVER";

export interface ConnectServerAction
  extends NetworkAction<typeof CONNECT_SERVER> {
  payload: {
    host: string;
    port: number;
    newConnection: boolean;
  };
}

export const connectServer = (
  serverKey: string,
  host: string,
  port: number = 6667,
  newConnection = false,
): ConnectServerAction => ({
  type: CONNECT_SERVER,
  payload: { host, port, newConnection },
  route: { serverKey, channelKey: BROADCAST_NONE },
});

// Disconnect from server

export const DISCONNECT_SERVER = "SOCKET/DISCONNECT_SERVER";

export interface DisconnectServerAction
  extends NetworkAction<typeof DISCONNECT_SERVER> {
  payload: { quitMessage?: string };
}

export const disconnectServer = (
  serverKey: string,
  quitMessage?: string,
): DisconnectServerAction => ({
  type: DISCONNECT_SERVER,
  payload: { quitMessage },
  route: { serverKey, channelKey: BROADCAST_NONE },
});

// Send raw message to socket

export const SEND_RAW_MESSAGE = "SOCKET/SEND_RAW_MESSAGE";

export interface SendRawMessageAction<A = void>
  extends Action<typeof SEND_RAW_MESSAGE> {
  serverKey: string;
  payload: { raw: string };
  action?: A;
}

export const sendRawMessage = (
  serverKey: string,
  message: string,
): SendRawMessageAction => ({
  type: SEND_RAW_MESSAGE,
  serverKey,
  payload: { raw: message },
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

// Receive raw messages from socket

export const RAW_MESSAGES_RECEIVED = "SOCKET/RAW_MESSAGES";

export interface RawMessagesAction
  extends NetworkAction<typeof RAW_MESSAGES_RECEIVED> {
  payload: { messages: string[] };
}

export const receiveRawMessages = (
  serverKey: string,
  messages: string[],
): RawMessagesAction => ({
  type: RAW_MESSAGES_RECEIVED,
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
  route: { serverKey, channelKey: BROADCAST_ALL },
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
  route: { serverKey, channelKey: BROADCAST_ALL },
});
