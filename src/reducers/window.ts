import { Route, STATUS_BUFFER } from "@app/Route";
import { SwitchWindowAction, SWITCH_WINDOW } from "@app/actions/ui-window";
import { JoinAction, JOIN } from "@app/actions/message-in";
import { UserState } from "@app/reducers/user";

export type WindowState = Route;

export type WindowAction = JoinAction | SwitchWindowAction;

export const windowInitialState: WindowState = {
  serverKey: "serverKey", // TODO multi servers
  bufferKey: STATUS_BUFFER,
};

type ExtraParams = {
  user: UserState;
};

export default (
  window = windowInitialState,
  action: WindowAction,
  { user }: ExtraParams,
): WindowState => {
  switch (action.type) {
    case JOIN:
      return action.payload.user.nick === user.nick ? action.route : window;

    case SWITCH_WINDOW:
      return action.route;

    default:
      return window;
  }
};
