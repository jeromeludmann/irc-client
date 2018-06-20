import {
  User,
  MessageAction,
  MessageActionCreator,
} from "@app/actions/messages/helpers";

interface Join {
  user: User;
  channel: string;
}

export const MESSAGE_JOIN = "MESSAGE/JOIN";

export type JoinAction = MessageAction<typeof MESSAGE_JOIN, Join>;

export const joinReceived: MessageActionCreator<JoinAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: MESSAGE_JOIN,
  payload: { user, channel: params[0] },
  route: { server: serverKey, window: params[0] },
});
