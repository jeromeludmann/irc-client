import { Middleware } from "redux";
import {
  PingFromServerReceivedAction,
  PING_FROM_SERVER_RECEIVED,
  sendPongToServer,
} from "@app/actions/messages";

/**
 * Ping/Pong Middleware
 *
 * Handle PING from server and reply with PONG message.
 */
export const pingPong: Middleware = () => next => (
  action: PingFromServerReceivedAction,
) => {
  next(action);

  if (action.type === PING_FROM_SERVER_RECEIVED) {
    next(sendPongToServer(action.route.serverKey, action.payload.key));
  }
};
