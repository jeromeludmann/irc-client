import { WindowState } from "@app/reducers/window";
import { Route } from "@app/Route";
import { SWITCH_WINDOW, SwitchWindowAction } from "@app/actions/window";
import {
  RawMessagesReceivedAction,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/network";
import { UserState } from "@app/reducers/user";
import {
  IncomingJoinAction,
  IncomingChannelNoticeAction,
  JOIN,
  CHANNEL_NOTICE,
  IncomingPrivmsgAction,
  PRIVMSG,
  IncomingPartAction,
  PART,
} from "@app/actions/incoming";

export type UnreadState = boolean;

export type UnreadAction =
  | IncomingPartAction
  | IncomingJoinAction
  | SwitchWindowAction
  | RawMessagesReceivedAction
  | IncomingPrivmsgAction
  | IncomingChannelNoticeAction;

interface ExtraParams {
  readonly user: UserState;
  readonly active: WindowState;
  readonly route: Route;
}

export const unreadInitialState: UnreadState = false;

export default (
  unread = unreadInitialState,
  action: UnreadAction,
  { user, active, route }: ExtraParams,
): UnreadState => {
  switch (action.type) {
    case SWITCH_WINDOW:
      return false;

    case JOIN:
      return action.payload.user.nick !== user.nick;

    case PART:
    case PRIVMSG:
    case CHANNEL_NOTICE:
    case RAW_MESSAGES_RECEIVED:
      return (
        active.serverKey !== route.serverKey ||
        active.bufferKey !== route.bufferKey
      );

    default:
      return unread;
  }
};
