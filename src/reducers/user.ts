import { NICK, NickAction } from "@app/actions/message-in";

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
    case NICK:
      return action.payload.user.nick === params.user.nick
        ? { ...user, nick: action.payload.nick }
        : user;

    default:
      return user;
  }
};
