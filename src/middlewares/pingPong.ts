import { Middleware } from "redux";
import {
  PingFromServerAction,
  PING_FROM_SERVER,
  sendPongToServer,
} from "@app/actions/messages";

/**
 * Ping/Pong Middleware
 *
 * Handle PING from server and reply with PONG message.
 */
export const pingPong: Middleware = () => next => (
  action: PingFromServerAction,
) => {
  next(action);

  if (action.type === PING_FROM_SERVER) {
    next(sendPongToServer(action.route.serverKey, action.payload.key));
  }
};
