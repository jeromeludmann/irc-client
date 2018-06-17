import { Middleware } from "redux";

interface Props {
  exclude: string[];
}

export const createLogger = ({ exclude: actions }: Props): Middleware => {
  for (const action of actions) {
    // tslint:disable-next-line
    console.warn(`(excluded from logger) ${action}`);
  }

  return () => next => action => {
    if (actions.indexOf(action.type) === -1) {
      // tslint:disable-next-line
      console.log(`%c ${JSON.stringify(action)}`, getStyle(action.type));
    }

    next(action);
  };
};

function getStyle(type: string) {
  if (type.indexOf("MESSAGE/RAW") === 0) {
    return "color: gray";
  }
  if (type.indexOf("MESSAGE/") === 0) {
    return "color: blue";
  }
  if (type.indexOf("COMMAND/") === 0) {
    return "color: darkred; font-weight: bolder";
  }
  if (type.indexOf("UI/") === 0) {
    return "color: lightgreen";
  }
  return "color: black;";
}
