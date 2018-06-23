import { RouteState } from "@app/reducers/route";
import { SWITCH_CHANNEL, SwitchRouteAction } from "@app/actions/route";
import { ReceiveRawMessagesAction, RAW_MESSAGES } from "@app/actions/network";
import {
  JoinAction,
  ChannelNoticeAction,
  JOIN,
  NOTICE_CHANNEL,
  PrivmsgAction,
  PRIVMSG,
  PartAction,
  PART,
} from "@app/actions/incoming";
import { UserState } from "@app/reducers/server/user";

export type UnreadState = boolean;

export type UnreadAction =
  | PartAction
  | JoinAction
  | SwitchRouteAction
  | ReceiveRawMessagesAction
  | PrivmsgAction
  | ChannelNoticeAction;

export const unreadInitialState: UnreadState = false;

export const reduceUnread = (
  unread = unreadInitialState,
  action: UnreadAction,
  states: { active: RouteState; user: UserState },
): UnreadState => {
  switch (action.type) {
    case SWITCH_CHANNEL:
      return false;

    case JOIN:
      return action.payload.user.nick !== states.user.nick;

    case PART:
    case PRIVMSG:
    case NOTICE_CHANNEL:
    case RAW_MESSAGES:
      return (
        states.active.serverKey !== action.route.serverKey ||
        states.active.channelKey !== action.route.channelKey
      );

    default:
      return unread;
  }
};
