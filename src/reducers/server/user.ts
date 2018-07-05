import { Action } from "redux";
import { mapReducer } from "@app/reducers/_map";
import { NickAction, NICK } from "@app/actions/messages";

export interface UserState {
  nick: string;
  user: string;
  real: string;
}

export const userInitialState: UserState = {
  nick: "default_nick",
  user: "default_user",
  real: "Default Realname",
};

type UserReducer<A = Action> = (user: UserState, action: A) => UserState;

const nick: UserReducer<NickAction> = (user, action) =>
  action.payload.user.nick === user.nick
    ? { ...user, nick: action.payload.nick }
    : user;

const map: { [action: string]: UserReducer } = {
  [NICK]: nick,
};

export const reduceUser = mapReducer<UserState>(map);
