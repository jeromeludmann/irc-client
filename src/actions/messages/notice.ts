import {
  MessageAction,
  MessageActionCreator,
  isChannel,
  isPrefixServer,
  User,
  Server,
} from "@app/actions/messages/helpers";
import { STATUS_WINDOW } from "@app/Route";

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
> = (serverKey, prefix, params) => {
  if (isPrefixServer(prefix)) {
    return {
      type: MESSAGE_SERVER_NOTICE,
      payload: { server: prefix as Server, text: params[1] },
      route: { server: serverKey, window: STATUS_WINDOW },
    };
  }

  return isChannel(params[0])
    ? {
        type: MESSAGE_CHANNEL_NOTICE,
        payload: { user: prefix as User, channel: params[0], text: params[1] },
        route: { server: serverKey, window: params[0] },
      }
    : {
        type: MESSAGE_USER_NOTICE,
        payload: { user: prefix as User, text: params[1] },
        route: { server: serverKey, window: STATUS_WINDOW },
      };
};
