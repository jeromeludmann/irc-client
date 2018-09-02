import { Action, Reducer } from "redux";
import { NickReceivedAction, NICK_RECEIVED } from "@app/actions/messages";

export interface UserState {
  nick: string;
  user: string;
  real: string;
}

export const userInitialState: UserState = {
  nick: "default_nick", // TODO
  user: "default_user", // TODO
  real: "default_name", // TODO
};

const handlers: { [action: string]: Reducer } = {
  [NICK_RECEIVED]: (user, action: NickReceivedAction) =>
    action.payload.user.nick === user.nick
      ? { ...user, nick: action.payload.nick }
      : user,
};

export const reduceUser = (
  user: UserState = userInitialState,
  action: Action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](user, action)
    : user;
