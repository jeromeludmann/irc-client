import {
  User,
  MessageAction,
  MessageActionCreator,
} from "@app/actions/messages/raw";

interface Join {
  user: User;
  channel: string;
}

export const MESSAGE_JOIN = "MESSAGE/JOIN";

export type JoinAction = MessageAction<typeof MESSAGE_JOIN, Join>;

export const joinReceived: MessageActionCreator<JoinAction, User> = (
  user,
  params,
) => {
  return {
    type: MESSAGE_JOIN,
    payload: { user, channel: params[0] },
    route: { channel: params[0] },
  };
};
