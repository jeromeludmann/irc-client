import { Middleware, Action } from "redux";
import {
  CONNECTION_ESTABLISHED,
  ConnectionEstablishedAction,
} from "@app/actions/network";
import { sendUser, sendNick, sendPong } from "@app/actions/message-out";
import { IncomingServerPingAction, SERVER_PING } from "@app/actions/message-in";
import { RootState } from "@app/reducers";

type Actions = ConnectionEstablishedAction | IncomingServerPingAction;

export const autoReply: Middleware<{}, RootState> = store => next => (
  action: Actions,
) => {
  next(action);

  if (actions.hasOwnProperty(action.type)) {
    actions[action.type](action, store.getState()).forEach(next);
  }
};

const onConnectionEstablished = (
  action: ConnectionEstablishedAction,
  state: RootState,
) => [
  sendUser(action.route.serverKey, state.user.user, state.user.real),
  sendNick(action.route.serverKey, state.user.nick),
];

const onServerPing = (action: IncomingServerPingAction) => [
  sendPong(action.route.serverKey, action.payload.key),
];

const actions: {
  [action: string]: (action: Actions, state: RootState) => Action[];
} = {
  [CONNECTION_ESTABLISHED]: onConnectionEstablished,
  [SERVER_PING]: onServerPing,
};
