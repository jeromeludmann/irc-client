import { Action, Reducer } from "redux";
import { NickAction, NICK } from "@app/actions/messages";

export interface UserState {
  nick: string;
  user: string;
  real: string;
}

export const userInitialState: UserState = {
  nick: "",
  user: "",
  real: "",
};

const handlers: { [action: string]: Reducer } = {
  [NICK]: (user, action: NickAction) =>
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
