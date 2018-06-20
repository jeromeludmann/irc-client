import { Middleware, Action } from "redux";
import {
  CONNECTION_ESTABLISHED,
  ConnectionEstablishedAction,
} from "@app/actions/socket";
import { user, nick, pong } from "@app/actions/commands";
import {
  ServerPingAction,
  MESSAGE_SERVER_PING,
} from "@app/actions/messages/ping";
import { RootState } from "@app/reducers";

type Actions = ConnectionEstablishedAction | ServerPingAction;

export const repliers: Middleware<{}, RootState> = store => next => (
  action: Actions,
) => {
  next(action);

  if (actions.hasOwnProperty(action.type)) {
    actions[action.type](action, store.getState()).forEach(next);
  }
};

const actions: {
  [action: string]: (action: Actions, state: RootState) => Action[];
} = {
  [CONNECTION_ESTABLISHED]: (
    action: ConnectionEstablishedAction,
    state: RootState,
  ) => [
    user(action.serverKey, state.user.user, state.user.real),
    nick(action.serverKey, state.user.nick),
  ],
  [MESSAGE_SERVER_PING]: (action: ServerPingAction) => [
    pong(action.route.server, action.payload.key),
  ],
};
