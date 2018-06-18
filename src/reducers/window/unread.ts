import { ActiveWindowState } from "@app/reducers/active";
import { Route } from "@app/Route";
import { SET_WINDOW, SetWindowAction } from "@app/actions/ui/active-window";
import {
  RawMessagesReceivedAction,
  RAW_MESSAGES_RECEIVED,
} from "@app/actions/socket";
import { MESSAGE_JOIN, JoinAction } from "@app/actions/messages/join";
import {
  ChannelPrivmsgAction,
  MESSAGE_CHANNEL_PRIVMSG,
} from "@app/actions/messages/privmsg";
import {
  ChannelNoticeAction,
  MESSAGE_CHANNEL_NOTICE,
} from "@app/actions/messages/notice";
import { UserState } from "@app/reducers/user";

export type UnreadState = boolean;

export type UnreadAction =
  | JoinAction
  | SetWindowAction
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
    case SET_WINDOW:
      return false;

    case MESSAGE_JOIN:
      return action.payload.user.nick !== user.nick;

    case RAW_MESSAGES_RECEIVED:
    case MESSAGE_CHANNEL_NOTICE:
    case MESSAGE_CHANNEL_PRIVMSG:
      return active.server !== route.server || active.window !== route.window;

    default:
      return unread;
  }
};
