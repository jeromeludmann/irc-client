import { Middleware } from "redux";
import {
  ConnectionEstablishedAction,
  CONNECTION_ESTABLISHED,
} from "@app/actions/socket";
import { AppState } from "@app/reducers";
import { sendUser, sendNick } from "@app/actions/messages";

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

    next(sendUser(serverKey, user, real));
    next(sendNick(serverKey, nick));
  }
};
