import { NICK, NickAction } from "@app/actions/incoming";

export interface UserState {
  nick: string;
  user: string;
  real: string;
}

export type UserAction = NickAction;

export const userInitialState: UserState = {
  nick: "default_nick",
  user: "default_user",
  real: "Default Realname",
};

export const reduceUser = (
  user = userInitialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case NICK:
      return action.payload.user.nick === user.nick
        ? { ...user, nick: action.payload.nick }
        : user;

    default:
      return user;
  }
};
