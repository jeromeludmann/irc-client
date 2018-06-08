import { SetActiveWindow, SET_ACTIVE_WINDOW } from "@app/actions";

export interface ActiveState {
  server: string;
  channel: string;
}

export default function reduceCurrent(
  active: ActiveState = { server: "", channel: "" },
  { type, payload }: SetActiveWindow,
) {
  switch (type) {
    case SET_ACTIVE_WINDOW:
      return { server: payload.server, channel: payload.channel };
    default:
      return active;
  }
}
