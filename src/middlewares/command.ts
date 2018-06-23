import { Middleware, Action } from "redux";
import { EnterInputValueAction, ENTER_INPUT_VALUE } from "@app/actions/input";
import { connectServer, disconnectServer } from "@app/actions/network";
import { RootState } from "@app/reducers";
import { sendRaw, sendJoin } from "@app/actions/outgoing";
import { sendPrivmsg } from "@app/actions/outgoing";

const commandRegistry: {
  [command: string]: (serverKey: string, params: string) => Action;
} = {
  connect(_, params) {
    // TODO dispatch error action
    if (!params) {
      // tslint:disable-next-line
      console.warn("params is missing");
      return { type: "ACTION" };
    }

    const [host, port] = params.split(" ", 2);
    return connectServer(host, port ? +port : undefined);
  },
  disconnect(serverKey) {
    return disconnectServer(serverKey);
  },
  join(serverKey, params) {
    const channel = params;
    return sendJoin(serverKey, channel);
  },
  raw(serverKey, params) {
    const message = params;
    return sendRaw(serverKey, message);
  },
  quote(serverKey, params) {
    return this.raw(serverKey, params);
  },
};

export const command: Middleware<{}, RootState> = store => next => (
  action: EnterInputValueAction,
) => {
  next(action);

  if (action.type !== ENTER_INPUT_VALUE) {
    return;
  }

  const value = action.payload.value;
  const regExpResult = value.match(/^\s*\/(\S+)(\s+)?(.*)?/);
  const { serverKey, channelKey } = store.getState().route;

  if (!regExpResult) {
    if (channelKey.charAt(0) !== "@") {
      next(sendPrivmsg(serverKey, channelKey, value));
    } else {
      // tslint:disable-next-line
      console.log("Not a channel/private");
    }
    return;
  }

  const cmd = regExpResult[1].toLowerCase();

  if (!commandRegistry.hasOwnProperty(cmd)) {
    // TODO dispatch error action
    // tslint:disable-next-line
    console.warn("Command not found: " + cmd);
    return;
  }

  next(commandRegistry[cmd](serverKey, regExpResult[3]));
};
