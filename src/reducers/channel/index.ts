import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from "@app/reducers/channel/messages";
import {
  InputState,
  inputInitialState,
  reduceInput,
} from "@app/reducers/input";
import {
  UnreadState,
  unreadInitialState,
  reduceUnread,
} from "@app/reducers/channel/unread";
import { RoutedAction } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";

export interface ChannelState {
  readonly messages: MessagesState;
  readonly input: InputState;
  readonly unread: UnreadState;
}

export const channelInitialState: ChannelState = {
  messages: messagesInitialState,
  input: inputInitialState,
  unread: unreadInitialState,
};

export const reduceChannel = (
  channel = channelInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
): ChannelState => ({
  messages: reduceMessages(channel.messages, action, extraStates),
  input: reduceInput(channel.input, action),
  unread: reduceUnread(channel.unread, action, extraStates),
});
