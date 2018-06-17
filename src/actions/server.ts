import { Action } from "redux";

export const CONNECT_SERVER = "SERVER/CONNECT_SERVER";
export const DISCONNECT_SERVER = "SERVER/DISCONNECT_SERVER";

export type ConnectServerAction = Action<typeof CONNECT_SERVER> & {
  payload: {
    host: string;
    port: number;
  };
};

export type DisconnectServerAction = Action<typeof DISCONNECT_SERVER>;

export const connectServer = (
  host: string,
  port: number = 6667,
): ConnectServerAction => ({
  type: CONNECT_SERVER,
  payload: { host, port },
});

export const disconnectServer = (): DisconnectServerAction => ({
  type: DISCONNECT_SERVER,
});
