import { SetActiveWindow, SET_ACTIVE_ROUTE } from "@app/actions";

export interface ActiveState {
  readonly server: string;
  readonly channel: string;
}

export type ActiveAction = SetActiveWindow;

export const activeInitialState: ActiveState = {
  server: "default", // TODO
  channel: "status",
};

export default function reduceActive(
  active = activeInitialState,
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
