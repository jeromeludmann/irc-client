import { SetActiveWindow, SET_ACTIVE_ROUTE } from "@app/actions";

export interface ActiveState {
  server: string;
  channel: string;
}

export type ActiveAction = SetActiveWindow;

export const initialActiveState = { server: "", channel: "" };

export default function reduceActive(
  active: ActiveState = initialActiveState,
  action: ActiveAction,
) {
  switch (action.type) {
    case SET_ACTIVE_ROUTE:
      return {
        server: action.payload.server,
        channel: action.payload.channel,
      };

    default:
      return active;
  }
}
