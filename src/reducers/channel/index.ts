import {
  MessagesState,
  MessagesAction,
  messagesInitialState,
  reduceMessages,
} from "@app/reducers/channel/messages";
import {
  InputState,
  InputAction,
  inputInitialState,
  reduceInput,
} from "@app/reducers/input";
import {
  UnreadState,
  UnreadAction,
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
  states: { active: RouteState; user: UserState },
): ChannelState => ({
  messages: reduceMessages(channel.messages, action as MessagesAction),
  input: reduceInput(channel.input, action as InputAction),
  unread: reduceUnread(channel.unread, action as UnreadAction, states),
});
