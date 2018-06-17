import {
  User,
  MessageAction,
  MessageActionCreator,
} from "@app/actions/messages/raw";

interface Privmsg {
  user: User;
  target: string;
  text: string;
}

export const MESSAGE_PRIVMSG = "MESSAGE/PRIVMSG";

export type PrivmsgAction = MessageAction<typeof MESSAGE_PRIVMSG, Privmsg>;

export const privmsgReceived: MessageActionCreator<PrivmsgAction, User> = (
  user,
  params,
) => ({
  type: MESSAGE_PRIVMSG,
  payload: { user, target: params[0], text: params[1] },
  route: { channel: params[0] },
});
