import { RoutedAction, BROADCAST_ACTIVE } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { SWITCH_WINDOW, SwitchWindowAction } from "@app/actions/ui";
import { UserState } from "@app/reducers/server/user";
import { JoinAction, JOIN } from "@app/actions/messages";

export type ActivityState = boolean;

export const activityInitialState: ActivityState = false;

type ActivityReducer<A = RoutedAction> = (
  state: ActivityState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => ActivityState;

const join: ActivityReducer<JoinAction> = (_, action, extraStates) =>
  action.payload.user.nick !== extraStates.user.nick;

const switchWindow: ActivityReducer<SwitchWindowAction> = () => false;

const hasAnyActivity: ActivityReducer<RoutedAction> = (
  _,
  action,
  extraStates,
) => {
  const sameRoute =
    action.route.serverKey === extraStates.route.serverKey &&
    action.route.channelKey === extraStates.route.channelKey;
  return !sameRoute && action.route.channelKey !== BROADCAST_ACTIVE;
};

const reducers: { [action: string]: ActivityReducer } = {
  [JOIN]: join,
  [SWITCH_WINDOW]: switchWindow,
};

export const reduceActivity = (
  activity: ActivityState = activityInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
) =>
  reducers.hasOwnProperty(action.type)
    ? reducers[action.type](activity, action, extraStates)
    : hasAnyActivity(activity, action, extraStates);
