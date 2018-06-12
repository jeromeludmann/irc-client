import { Middleware } from "redux";
import { SEND_MESSAGE, SendMessage } from "@app/actions/irc";

/**
 * Handle IRC actions and send them to server
 */
const messageHandler: Middleware = () => next => (action: SendMessage) => {
  if (action.type === SEND_MESSAGE) {
    // tslint:disable-next-line
    console.log("socket.write => ", action.payload.message);
  }

  next(action);
};

export default messageHandler;
