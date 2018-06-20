import { Action } from "redux";
import { Route } from "@app/Route";

export const SET_WINDOW = "UI/SET_WINDOW";

export interface SetWindowAction extends Action<typeof SET_WINDOW> {
  route: Route;
}

export function setWindow(route: Route): SetWindowAction {
  return {
    type: SET_WINDOW,
    route,
  };
}
