import { Action } from "redux";

export const SET_ACTIVE_ROUTE = "UI/SET_ACTIVE_ROUTE";

export interface SetActiveRouteAction extends Action<typeof SET_ACTIVE_ROUTE> {
  payload: { server: string; channel: string };
}

export function setActiveRoute(
  server: string,
  channel: string,
): SetActiveRouteAction {
  return { type: SET_ACTIVE_ROUTE, payload: { server, channel } };
}
