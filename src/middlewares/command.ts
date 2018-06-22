import { Middleware, Action } from "redux";
import {
  EnterInputValueAction,
  ENTER_INPUT_VALUE,
} from "@app/actions/ui-input";
import { connectServer, disconnectServer } from "@app/actions/network";
import { RootState } from "@app/reducers";
import { sendRaw, sendJoin } from "@app/actions/message-out";
import { sendPrivmsg } from "@app/actions/message-out";

const registry: {
  [command: string]: (
    { serverKey, params }: { serverKey: string; params: string },
  ) => Action;
} = {
  connect({ params }) {
    // TODO dispatch error action
    if (!params) {
      // tslint:disable-next-line
      console.warn("params is missing");
      return { type: "ACTION" };
    }

    return connectServer(params);
  },
  disconnect({ serverKey }) {
    return disconnectServer(serverKey);
  },
  join({ serverKey, params: channel }) {
    return sendJoin(serverKey, channel);
  },
  raw({ serverKey, params: message }) {
    return sendRaw(serverKey, message);
  },
};

export const commands: Middleware<{}, RootState> = store => next => (
  action: EnterInputValueAction,
) => {
  next(action);

  if (action.type !== ENTER_INPUT_VALUE) {
    return;
  }

  const value = action.payload.value;
  const regExpResult = value.match(/^\s*\/(\S+)(\s+)?(.*)?/);
  const { serverKey, bufferKey } = store.getState().active;

  if (!regExpResult) {
    if (bufferKey.charAt(0) !== "@") {
      next(sendPrivmsg(serverKey, bufferKey, value));
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

  next(registry[command]({ serverKey, params: regExpResult[3] }));
};
