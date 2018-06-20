import {
  User,
  MessageAction,
  MessageActionCreator,
  isChannel,
} from "@app/actions/messages/helpers";

interface ChannelPrivmsg {
  user: User;
  channel: string;
  text: string;
}

interface UserPrivmsg {
  user: User;
  text: string;
}

export const MESSAGE_CHANNEL_PRIVMSG = "MESSAGE/CHANNEL_PRIVMSG";
export const MESSAGE_USER_PRIVMSG = "MESSAGE/USER_PRIVMSG";

export type ChannelPrivmsgAction = MessageAction<
  typeof MESSAGE_CHANNEL_PRIVMSG,
  ChannelPrivmsg
>;

export type UserPrivmsgAction = MessageAction<
  typeof MESSAGE_USER_PRIVMSG,
  UserPrivmsg
>;

export const privmsgReceived: MessageActionCreator<
  ChannelPrivmsgAction | UserPrivmsgAction,
  User
> = (serverKey, user, params) => {
  const target = params[0];
  const text = params[1];

  return isChannel(target)
    ? {
        type: MESSAGE_CHANNEL_PRIVMSG,
        payload: { user, channel: target, text },
        route: { server: serverKey, window: target },
      }
    : {
        type: MESSAGE_USER_PRIVMSG,
        payload: { user, text },
        route: { server: serverKey, window: user.nick },
      };
};
