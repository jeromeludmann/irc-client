import { RoutedAction, ChannelRoute } from "@app/Route";

export const INPUT_CHANGED = "INPUT/CHANGED";
export const INPUT_SENT = "INPUT/SENT";

export interface ChangedAction extends RoutedAction<ChannelRoute> {
  type: typeof INPUT_CHANGED;
  payload: { value: string };
}

export interface SentAction extends RoutedAction<ChannelRoute> {
  type: typeof INPUT_SENT;
  payload: { value: string };
}
