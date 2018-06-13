import { Middleware, Dispatch } from "redux";
import { SOCKET_CONNECT, SocketConnectAction } from "@app/actions/socket";
import { user, nick, pong, CommandAction } from "@app/actions/commands";
import { PingAction, MESSAGE_PING } from "@app/actions/messages/ping";

type RepliersAction = SocketConnectAction | PingAction;

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
  [SOCKET_CONNECT]: register,
  [MESSAGE_PING]: pingPong,
};
