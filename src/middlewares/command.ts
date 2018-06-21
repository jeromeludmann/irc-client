import { Middleware, Action } from "redux";
import {
  EnterInputValueAction,
  ENTER_INPUT_VALUE,
} from "@app/actions/ui-input";
import { connectServer, disconnectServer } from "@app/actions/network";
import { RootState } from "@app/reducers";
import { raw, join } from "@app/actions/message-out";
import { privmsg } from "@app/actions/message-out";

export const commands: Middleware<{}, RootState> = store => next => (
  action: EnterInputValueAction,
) => {
  next(action);

  if (action.type !== ENTER_INPUT_VALUE) {
    return;
  }

  const { server, window } = store.getState().active;
  const value = action.payload.value;
  const regExpResult = value.match(/^\s*\/(\S+)(\s+)?(.*)?/);

  if (!regExpResult) {
    if (window.charAt(0) !== "@") {
      next(privmsg(server, window, value));
    } else {
      // tslint:disable-next-line
      console.log("Not a channel/private");
    }
    return;
  }

  const command = regExpResult[1].toLowerCase();

  if (!registry.hasOwnProperty(command)) {
    // TODO dispatch error action
    // tslint:disable-next-line
    console.warn("Command not found: " + command);
    return;
  }

  next(registry[command](server, regExpResult[3]));
};

type Command = (server: string, params: string) => Action;

const registry: { [command: string]: Command } = {
  connect: (_server, params) => {
    // TODO dispatch error action
    if (!params) {
      // tslint:disable-next-line
      console.warn("params is missing");
      return { type: "ACTION" };
    }

    return connectServer(params);
  },
  disconnect: server => {
    return disconnectServer(server);
  },
  join: (server, channel) => {
    return join(server, channel);
  },
  raw: (server, params) => {
    return raw(server, params);
  },
};
