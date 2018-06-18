import { SetWindowAction, SET_WINDOW } from "@app/actions/ui/active-window";
import { Route, STATUS_WINDOW } from "@app/Route";
import { MESSAGE_JOIN, JoinAction } from "@app/actions/messages/join";
import { UserState } from "@app/reducers/user";

export type ActiveWindowState = Route;

export type ActiveWindowAction = JoinAction | SetWindowAction;

export const activeInitialState: ActiveWindowState = {
  server: "serverKey", // TODO multi servers
  window: STATUS_WINDOW,
};

type ExtraParams = {
  user: UserState;
};

export default (
  active = activeInitialState,
  action: ActiveWindowAction,
  { user }: ExtraParams,
): ActiveWindowState => {
  switch (action.type) {
    case MESSAGE_JOIN:
      return action.payload.user.nick === user.nick ? action.route : active;

    case SET_WINDOW:
      return action.route;

    default:
      return active;
  }
};
