import { Middleware } from "redux";
import { isStatus, isRaw } from "@app/Route";
import { AppState } from "@app/reducers";
import { EnterInputValueAction, ENTER_INPUT_VALUE } from "@app/actions/ui";
import {
  Command,
  close,
  connect,
  disconnect,
  join,
  msg,
  part,
  raw,
} from "@app/actions/commands";

/**
 * Commands Handler Middleware
 *
 * Handle commands from input component.
 */
export const commands: Middleware<{}, AppState> = store => next => (
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
      next(msg.callback(route, channelKey, value));
    } else {
      // tslint:disable-next-line
      console.log("Not a channel/private");
    }
    return;
  }

  const commandName = parsedCommand[1].toLowerCase();
  const commandArgs = parsedCommand[2] || "";

  if (!commandsMap.hasOwnProperty(commandName)) {
    // TODO help() action
    // tslint:disable-next-line
    console.warn("Command not found: " + commandName);
    return;
  }

  const command = commandsMap[commandName];
  const parsedArgs = commandArgs.match(command.regexp) || [];

  next(command.callback(route, ...parsedArgs.slice(1)));
};

const commandsMap: { [command: string]: Command } = {
  close,
  connect,
  disconnect,
  join,
  msg,
  part,
  quote: raw,
  raw,
};
