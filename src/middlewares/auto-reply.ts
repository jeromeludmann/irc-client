import { Middleware, Action } from "redux";
import {
  CONNECTION_ESTABLISHED,
  ConnectionEstablishedAction,
} from "@app/actions/network";
import { user, nick, pong } from "@app/actions/message-out";
import { ServerPingAction, SERVER_PING } from "@app/actions/message-in";
import { RootState } from "@app/reducers";

type Actions = ConnectionEstablishedAction | ServerPingAction;

export const autoReply: Middleware<{}, RootState> = store => next => (
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
    user(action.route.server, state.user.user, state.user.real),
    nick(action.route.server, state.user.nick),
  ],
  [SERVER_PING]: (action: ServerPingAction) => [
    pong(action.route.server, action.payload.key),
  ],
};
