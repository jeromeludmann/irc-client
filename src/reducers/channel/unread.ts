import { RouteState } from "@app/reducers/route";
import { SWITCH_WINDOW, SwitchWindowAction } from "@app/actions/ui";
import { RAW_MESSAGES_RECEIVED } from "@app/actions/socket";
import { UserState } from "@app/reducers/server/user";
import { mapReducer } from "@app/reducers/_map";
import { Action } from "redux";
import { RoutedAction, BROADCAST_ACTIVE } from "@app/Route";
import {
  JoinAction,
  JOIN,
  PART,
  PRIVMSG,
  NOTICE_FROM_SERVER,
  NOTICE_FROM_CHANNEL,
  NOTICE_FROM_USER,
} from "@app/actions/messages";

export type UnreadState = boolean;

export const unreadInitialState: UnreadState = false;

type UnreadReducer<A = Action> = (
  state: UnreadState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => UnreadState;

const join: UnreadReducer<JoinAction> = (_, action, extraStates) =>
  action.payload.user.nick !== extraStates.user.nick;

const switchRoute: UnreadReducer<SwitchWindowAction> = () => false;

const anyActivity: UnreadReducer<RoutedAction> = (_, action, extraStates) => {
  const sameRoute =
    action.route.serverKey === extraStates.route.serverKey &&
    action.route.channelKey === extraStates.route.channelKey;
  return !sameRoute && action.route.channelKey !== BROADCAST_ACTIVE;
};

const map: { [action: string]: UnreadReducer } = {
  [JOIN]: join,
  [SWITCH_WINDOW]: switchRoute,
  [PART]: anyActivity,
  [PRIVMSG]: anyActivity,
  [NOTICE_FROM_SERVER]: anyActivity,
  [NOTICE_FROM_CHANNEL]: anyActivity,
  [NOTICE_FROM_USER]: anyActivity,
  [RAW_MESSAGES_RECEIVED]: anyActivity,
};

export const reduceUnread = mapReducer<
  UnreadState,
  { route: RouteState; user: UserState }
>(map);
