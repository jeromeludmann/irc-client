import { SetActiveWindow, SET_ACTIVE_ROUTE } from "@app/actions";

export interface ActiveState {
  readonly server: string;
  readonly channel: string;
}

export type ActiveAction = SetActiveWindow;

export default function reduceActive(
  active: ActiveState,
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
