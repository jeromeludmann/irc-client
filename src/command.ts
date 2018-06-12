import { Middleware } from "redux";
import { SEND_COMMAND } from "@app/actions/irc";

/**
 * Middleware handling command actions from input
 * and write given value to socket.
 */
const command: Middleware = () => next => action => {
  if (action.type === SEND_COMMAND) {
    // TODO transform irc msg object to irc msg string
    console.log("socket.write", action.payload.value);
  }

  next(action);
};

export default command;
