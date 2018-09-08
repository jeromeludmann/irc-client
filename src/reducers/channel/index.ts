import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from "@app/reducers/channel/messages";
import {
  InputState,
  inputInitialState,
  reduceInput,
} from "@app/reducers/channel/input";
import {
  ActivityState,
  activityInitialState,
  reduceActivity,
} from "@app/reducers/channel/activity";
import { RoutedAction } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";

export type ChannelState = Readonly<{
  messages: MessagesState;
  input: InputState;
  activity: ActivityState;
}>;

export const channelInitialState: ChannelState = {
  messages: messagesInitialState,
  input: inputInitialState,
  activity: activityInitialState,
};

export const reduceChannel = (
  channel = channelInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
): ChannelState => ({
  messages: reduceMessages(channel.messages, action, extraStates),
  input: reduceInput(channel.input, action),
  activity: reduceActivity(channel.activity, action, extraStates),
});
