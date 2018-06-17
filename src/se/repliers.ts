import { Middleware, Dispatch } from "redux";
import { CONNECTION_ESTABLISHED, ConnectionEstablishedAction } from "@app/actions/socket";
import { user, nick, pong, CommandAction } from "@app/actions/commands";
import { PingAction, MESSAGE_PING } from "@app/actions/messages/ping";

type RepliersAction = ConnectionEstablishedAction | PingAction;

type ReplierFunction<A = void> = (
  next: Dispatch<CommandAction>,
  action: A,
) => void;

type Mapping = { [action: string]: ReplierFunction<unknown> };

export const repliers: Middleware = () => next => (action: RepliersAction) => {
  next(action);

  if (actions.hasOwnProperty(action.type)) {
    actions[action.type](next, action);
  }
};

const register: ReplierFunction = next => {
  next(user("username", "IRC Client"));
  next(nick("client"));
};

const pingPong: ReplierFunction<PingAction> = (next, action) => {
  next(pong(action.payload.key));
};

const actions: Mapping = {
  [CONNECTION_ESTABLISHED]: register,
  [MESSAGE_PING]: pingPong,
};
