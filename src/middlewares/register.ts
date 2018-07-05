import { Middleware } from "redux";
import {
  ConnectionEstablishedAction,
  CONNECTION_ESTABLISHED,
  sendMessage,
} from "@app/actions/socket";
import { AppState } from "@app/reducers";

/**
 * Register Middleware
 *
 * Register to server as soon as the connection is established.
 */
export const register: Middleware<{}, AppState> = ({ getState }) => next => (
  action: ConnectionEstablishedAction,
) => {
  next(action);

  if (action.type === CONNECTION_ESTABLISHED) {
    const { serverKey } = action.route;
    const { nick, user, real } = getState().servers[serverKey].user;

    next(sendMessage(serverKey, "user", user, "0", "*", real));
    next(sendMessage(serverKey, "nick", nick));
  }
};
