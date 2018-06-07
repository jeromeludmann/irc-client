import { SetActiveWindow, SET_ACTIVE_WINDOW } from "@app/navigation/types";

export interface CurrentState {
  server: string;
  channel: string;
}

export default function reduceCurrent(
  current: CurrentState = { server: "", channel: "" },
  { type, payload }: SetActiveWindow,
) {
  switch (type) {
    case SET_ACTIVE_WINDOW:
      return { server: payload.server, channel: payload.channel };
    default:
      return current;
  }
}
