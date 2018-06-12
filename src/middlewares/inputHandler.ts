import { Middleware } from "redux";
import { INPUT_VALUE_SEND, SendInputValue } from "@app/actions/input";
import { raw } from "@app/actions/irc";

/**
 * Handle input value string and dispatch a corresponding IRC action
 */
const inputHandler: Middleware = ({ dispatch }) => next => (
  action: SendInputValue,
) => {
  if (action.type === INPUT_VALUE_SEND) {
    dispatch(raw(action.payload.value));

    // const value = action.payload.value;
    // const p = value.indexOf(" ");
    // const command = value.slice(0, p) as Command;
    // const params = value.slice(p + 1);
    // dispatch(raw(command, params));
  }

  next(action);
};

export default inputHandler;
