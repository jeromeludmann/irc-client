import { Middleware } from "redux";
import {
  ReceivePingFromServerAction,
  RECEIVE_PING_FROM_SERVER,
} from "@app/actions/msgIncoming";
import { sendPongToServer } from "@app/actions/msgOutgoing";

/**
 * Ping/Pong Middleware
 *
 * Handle PING from server and reply with PONG message.
 */
export const pingPong: Middleware = () => next => (
  action: ReceivePingFromServerAction,
) => {
  next(action);

  if (action.type === RECEIVE_PING_FROM_SERVER) {
    next(sendPongToServer(action.route.serverKey, action.payload.key));
  }
};
