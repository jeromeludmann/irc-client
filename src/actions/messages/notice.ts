import {
  MessageAction,
  MessageActionCreator,
  isChannel,
  isPrefixServer,
  User,
  Server,
} from "@app/actions/messages/raw";

interface ServerNotice {
  server: Server;
  text: string;
}

interface ChannelNotice {
  user: User;
  channel: string;
  text: string;
}

interface UserNotice {
  user: User;
  text: string;
}

export const MESSAGE_SERVER_NOTICE = "MESSAGE/SERVER_NOTICE";
export const MESSAGE_CHANNEL_NOTICE = "MESSAGE/CHANNEL_NOTICE";
export const MESSAGE_USER_NOTICE = "MESSAGE/USER_NOTICE";

export type ServerNoticeAction = MessageAction<
  typeof MESSAGE_SERVER_NOTICE,
  ServerNotice
>;

export type ChannelNoticeAction = MessageAction<
  typeof MESSAGE_CHANNEL_NOTICE,
  ChannelNotice
>;

export type UserNoticeAction = MessageAction<
  typeof MESSAGE_USER_NOTICE,
  UserNotice
>;

export const noticeReceived: MessageActionCreator<
  ServerNoticeAction | ChannelNoticeAction | UserNoticeAction
> = (prefix, params) => {
  const target = params[0];
  const text = params[1];

  if (isPrefixServer(prefix)) {
    return serverNotice(prefix as Server, text);
  }

  return isChannel(target)
    ? channelNotice(prefix as User, target, text)
    : userNotice(prefix as User, text);
};

const serverNotice = (server: Server, text: string): ServerNoticeAction => ({
  type: MESSAGE_SERVER_NOTICE,
  payload: { server, text },
  route: { channel: "status" },
});

const channelNotice = (
  user: User,
  target: string,
  text: string,
): ChannelNoticeAction => ({
  type: MESSAGE_CHANNEL_NOTICE,
  payload: { user, channel: target, text },
  route: { channel: target },
});

const userNotice = (user: User, text: string): UserNoticeAction => ({
  type: MESSAGE_USER_NOTICE,
  payload: { user, text },
  route: { channel: user.nick },
});
