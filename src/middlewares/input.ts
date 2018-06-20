import { Middleware } from "redux";
import { SendInputValueAction, SEND_INPUT_VALUE } from "@app/actions/ui/input";
import { connectServer, disconnectServer } from "@app/actions/server";
import { RootState } from "@app/reducers";
import { sendRawMessage, join } from "@app/actions/commands";

export const input: Middleware<{}, RootState> = store => next => (
  action: SendInputValueAction,
) => {
  next(action);

  if (action.type === SEND_INPUT_VALUE) {
    const server = store.getState().active.server;

    // TODO
    const value = action.payload.value;
    // const p = value.indexOf(" ");
    // const command = value.slice(0, p + 1);
    // const params = value.slice(p + 1);

    if (value.indexOf("/connect") === 0) {
      next(connectServer(value.slice(9)));
    } else if (value.indexOf("/disconnect") === 0) {
      next(disconnectServer());
    } else if (value.indexOf("/join") === 0) {
      next(join(server, value.slice(6)));
    } else if (value.indexOf("/raw") === 0) {
      next(sendRawMessage(server, value.slice(5)));
    }
  }
};
