import { Middleware } from "redux";
import { PingFromServerAction, PING_FROM_SERVER } from "@app/actions/messages";
import { sendMessage } from "@app/actions/socket";

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
    next(sendMessage(action.route.serverKey, "pong", action.payload.key));
  }
};
