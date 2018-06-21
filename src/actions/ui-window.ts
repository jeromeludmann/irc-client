import { Action } from "redux";
import { Route } from "@app/Route";

export const SWITCH_WINDOW = "UI/SWITCH_WINDOW";

export interface SwitchWindowAction extends Action<typeof SWITCH_WINDOW> {
  route: Route;
}

export function switchWindow(route: Route): SwitchWindowAction {
  return {
    type: SWITCH_WINDOW,
    route,
  };
}
