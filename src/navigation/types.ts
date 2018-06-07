export const SET_ACTIVE_WINDOW = "APP/SWITCH_CHANNEL";

export interface SetActiveWindow {
  type: typeof SET_ACTIVE_WINDOW;
  payload: { server: string; channel: string };
}
