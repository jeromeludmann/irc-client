import { Middleware } from "redux";
import { isStatus, isRaw } from "@app/Route";
import { AppState } from "@app/reducers";
import { EnterInputValueAction, ENTER_INPUT_VALUE } from "@app/actions/ui";
import { commands } from "@app/actions/commands";

/**
 * Commands Handler Middleware
 *
 * Handle commands from input component.
 */
export const commandHandler: Middleware<{}, AppState> = store => next => (
  action: EnterInputValueAction,
) => {
  next(action);

  if (action.type !== ENTER_INPUT_VALUE) {
    return;
  }

  const { route } = store.getState();
  const { channelKey } = route;

  const value = action.payload.value;
  const parsedCommand = value.match(/^\s*\/(\S+)(?:\s+)?(.*)?/);

  if (!parsedCommand) {
    if (!isStatus(channelKey) && !isRaw(channelKey)) {
      next(commands.msg.callback(route, channelKey, value));
    } else {
      // tslint:disable-next-line
      console.warn(`Not a channel or private: "${channelKey}"`);
    }
    return;
  }

  const commandName = parsedCommand[1].toLowerCase();
  const params = parsedCommand[2] || "";

  if (!commands.hasOwnProperty(commandName)) {
    // tslint:disable-next-line
    console.warn(`Command not found: "${commandName}"`);
    next(commands.help.callback(route));
    return;
  }

  const command = commands[commandName];
  const parsedParams = params.match(command.regexp);

  if (!parsedParams) {
    // tslint:disable-next-line
    console.warn(`Command found but bad params provided: "${params}"`);
    next(commands.help.callback(route, commandName));
    return;
  }

  next(command.callback(route, ...parsedParams.slice(1)));
};
