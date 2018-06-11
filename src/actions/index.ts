import { ActionCreator } from "redux";

export const SET_ACTIVE_ROUTE = "UI/SET_ACTIVE_ROUTE";

export interface SetActiveWindow {
  type: typeof SET_ACTIVE_ROUTE;
  payload: { server: string; channel: string };
}

export const setActiveWindow: ActionCreator<SetActiveWindow> = (
  server: string,
  channel: string,
) => ({
  type: SET_ACTIVE_ROUTE,
  payload: { server, channel },
});
