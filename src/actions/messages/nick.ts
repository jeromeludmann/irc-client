import {
  User,
  MessageAction,
  MessageActionCreator,
} from "@app/actions/messages/helpers";
import { STATUS_WINDOW } from "@app/Route";

interface Nick {
  user: User;
  nick: string;
}

export const MESSAGE_NICK = "MESSAGE/NICK";

export type NickAction = MessageAction<typeof MESSAGE_NICK, Nick>;

export const nickReceived: MessageActionCreator<NickAction, User> = (
  serverKey,
  user,
  params,
) => ({
  type: MESSAGE_NICK,
  payload: { user, nick: params[0] },
  route: { server: serverKey, window: STATUS_WINDOW },
});
