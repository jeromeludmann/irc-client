export const SET_ACTIVE_WINDOW = "SET_ACTIVE_WINDOW";

export interface SetActiveWindow {
  type: typeof SET_ACTIVE_WINDOW;
  payload: { server: string; channel: string };
}

export function setActiveWindow(server: string, channel: string) {
  return {
    type: SET_ACTIVE_WINDOW,
    payload: { server, channel },
  };
}
