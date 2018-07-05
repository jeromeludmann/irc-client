import { Action } from "redux";

export const mapReducer = <S, E = void>(map: {
  [action: string]: (state: S, action: Action, extraStates?: E) => S;
}) => (state: S, action: Action, extraStates?: E): S =>
  map.hasOwnProperty(action.type)
    ? map[action.type](state, action, extraStates)
    : state;
