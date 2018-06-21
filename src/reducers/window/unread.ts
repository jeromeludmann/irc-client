import { ActiveWindowState } from "@app/reducers/active";
import { Route } from "@app/Route";
import { SWITCH_WINDOW, SwitchWindowAction } from "@app/actions/ui-window";
import {
  RawMessagesReceivedAction,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/network";
import { UserState } from "@app/reducers/user";
import {
  JoinAction,
  ChannelPrivmsgAction,
  ChannelNoticeAction,
  JOIN,
  CHANNEL_NOTICE,
  CHANNEL_PRIVMSG,
} from "@app/actions/message-in";

export type UnreadState = boolean;

export type UnreadAction =
  | JoinAction
  | SwitchWindowAction
  | RawMessagesReceivedAction
  | ChannelPrivmsgAction
  | ChannelNoticeAction;

interface ExtraParams {
  readonly user: UserState;
  readonly active: ActiveWindowState;
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

    case RAW_MESSAGES_RECEIVED:
    case CHANNEL_NOTICE:
    case CHANNEL_PRIVMSG:
      return active.server !== route.server || active.window !== route.window;

    default:
      return unread;
  }
};
