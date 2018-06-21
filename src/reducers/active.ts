import { Route, STATUS_WINDOW } from "@app/Route";
import { SwitchWindowAction, SWITCH_WINDOW } from "@app/actions/ui-window";
import { JoinAction, JOIN } from "@app/actions/message-in";
import { UserState } from "@app/reducers/user";

export type ActiveWindowState = Route;

export type ActiveWindowAction = JoinAction | SwitchWindowAction;

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
    case JOIN:
      return action.payload.user.nick === user.nick ? action.route : active;

    case SWITCH_WINDOW:
      return action.route;

    default:
      return active;
  }
};
