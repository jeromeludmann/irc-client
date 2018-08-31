import { RoutedAction, BROADCAST_ACTIVE } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { SWITCH_WINDOW } from "@app/actions/ui";
import { UserState } from "@app/reducers/server/user";
import { JoinAction, JOIN } from "@app/actions/messages";

export type ActivityState = boolean;

export const activityInitialState: ActivityState = false;

type ActivityReducer<A = RoutedAction> = (
  state: ActivityState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => ActivityState;

const reducers: { [action: string]: ActivityReducer } = {
  [JOIN]: (_, action: JoinAction, extraStates) =>
    action.payload.user.nick !== extraStates.user.nick,

  [SWITCH_WINDOW]: () => false,
};

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

export const reduceActivity = (
  activity: ActivityState = activityInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
) =>
  reducers.hasOwnProperty(action.type)
    ? reducers[action.type](activity, action, extraStates)
    : hasAnyActivity(activity, action, extraStates);
