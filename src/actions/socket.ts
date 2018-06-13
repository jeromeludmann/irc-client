import { Action } from "redux";

export const CONNECT_SERVER = "COMMAND/CONNECT";
export const DISCONNECT_SERVER = "COMMAND/DISCONNECT";

export const SOCKET_CONNECT = "SOCKET/CONNECT";
export const SOCKET_END = "SOCKET/END";
export const SOCKET_CLOSE = "SOCKET/CLOSE";
export const SOCKET_ERROR = "SOCKET/ERROR";
export const SOCKET_DATA = "SOCKET/DATA";

export interface ConnectAction extends Action<typeof CONNECT_SERVER> {
  payload: { host: string; port: number };
}

export interface DisconnectAction extends Action<typeof DISCONNECT_SERVER> {}

export interface SocketConnectAction extends Action<typeof SOCKET_CONNECT> {}

export interface SocketEndAction extends Action<typeof SOCKET_END> {}

export interface SocketCloseAction extends Action<typeof SOCKET_CLOSE> {
  payload: { hadError: boolean };
}
export interface SocketErrorAction extends Action<typeof SOCKET_ERROR> {
  payload: { name: string; message: string };
}
export interface SocketDataAction extends Action<typeof SOCKET_DATA> {
  payload: { serverId: string; messages: string[] };
}

export function connect(host: string, port: number = 6667): ConnectAction {
  return { type: CONNECT_SERVER, payload: { host, port } };
}

export function disconnect(): DisconnectAction {
  return { type: DISCONNECT_SERVER };
}

export function socketConnect(): SocketConnectAction {
  return { type: SOCKET_CONNECT };
}

export function socketClose(hadError: boolean): SocketCloseAction {
  return { type: SOCKET_CLOSE, payload: { hadError } };
}

export function socketEnd(): SocketEndAction {
  return { type: SOCKET_END };
}

export function socketError(name: string, message: string): SocketErrorAction {
  return { type: SOCKET_ERROR, payload: { name, message } };
}

export function socketData(
  serverId: string,
  messages: string[],
): SocketDataAction {
  return { type: SOCKET_DATA, payload: { serverId, messages } };
}
