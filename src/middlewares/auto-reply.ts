import { Middleware, Action } from "redux";
import {
  CONNECTION_ESTABLISHED,
  ConnectionEstablishedAction,
} from "@app/actions/network";
import { sendUser, sendNick, sendPong } from "@app/actions/outgoing";
import { ServerPingAction, SERVER_PING } from "@app/actions/incoming";
import { RootState } from "@app/reducers";

type AutoReplyAction = ConnectionEstablishedAction | ServerPingAction;

const replyRegistry: {
  [action: string]: (action: AutoReplyAction, state: RootState) => Action[];
} = {
  [CONNECTION_ESTABLISHED](action, state) {
    const { nick, user, real } = state.servers[action.route.serverKey].user;
    return [
      sendUser(action.route.serverKey, user, real),
      sendNick(action.route.serverKey, nick),
    ];
  },
  [SERVER_PING](action) {
    return [
      sendPong(
        action.route.serverKey,
        (action as ServerPingAction).payload.key,
      ),
    ];
  },
};

export const autoReply: Middleware<{}, RootState> = store => next => (
  action: AutoReplyAction,
) => {
  next(action);

  if (replyRegistry.hasOwnProperty(action.type)) {
    replyRegistry[action.type](action, store.getState()).forEach(next);
  }
};
