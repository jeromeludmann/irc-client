import { MESSAGE_NICK, NickAction } from "@app/actions/messages/nick";

export interface UserState {
  nick: string;
  user: string;
  real: string;
}

export type UserAction = NickAction;

export const userInitialState: UserState = {
  nick: "",
  user: "",
  real: "",
};

interface ExtraParams {
  user: UserState;
}

export default (
  user = userInitialState,
  action: UserAction,
  params: ExtraParams,
): UserState => {
  switch (action.type) {
    case MESSAGE_NICK:
      return action.payload.user.nick === params.user.nick
        ? { ...user, nick: action.payload.nick }
        : user;

    default:
      return user;
  }
};
