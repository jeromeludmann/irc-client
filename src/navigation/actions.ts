import { SET_ACTIVE_WINDOW } from "@app/navigation/types";

export function setActiveWindow(server: string, channel: string) {
  return {
    type: SET_ACTIVE_WINDOW,
    payload: { server, channel },
  };
}
