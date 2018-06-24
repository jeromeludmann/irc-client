import { Middleware } from "redux";
import { UPDATE_INPUT_VALUE } from "@app/actions/ui";
import { SEND_RAW_MESSAGE } from "@app/actions/socket";

const excluded = [UPDATE_INPUT_VALUE];

/**
 * Logger Middleware
 *
 * Log all dispatched actions.
 */
export const logger: Middleware = _ => next => action => {
  if (excluded.indexOf(action.type) === -1) {
    // tslint:disable-next-line
    console.log(`%c ${JSON.stringify(action)}`, stylize(action.type));
  }

  next(action);
};

function stylize(type: string) {
  if (type.indexOf("MESSAGE/") === 0) {
    return "color: blue";
  }

  if (type.indexOf(SEND_RAW_MESSAGE) === 0) {
    return "color: red; font-weight: bold";
  }

  if (type.indexOf("SOCKET/") === 0) {
    return "color: lightgray";
  }

  if (type.indexOf("UI/") === 0) {
    return "color: lightgreen";
  }

  return "color: black";
}
