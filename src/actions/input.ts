import { RoutedAction, ChannelRoute } from "@app/Route";

export const INPUT_VALUE_CHANGED = "INPUT/VALUE/CHANGED";
export const INPUT_VALUE_SENT = "INPUT/VALUE/SENT";
export const INPUT_HISTORY_UPDATE = "INPUT/HISTORY/SET";

export interface InputValueChanged extends RoutedAction<ChannelRoute> {
  type: typeof INPUT_VALUE_CHANGED;
  payload: { value: string };
}

export interface InputValueSent extends RoutedAction<ChannelRoute> {
  type: typeof INPUT_VALUE_SENT;
  payload: { value: string };
}

export interface SetInputHistory extends RoutedAction<ChannelRoute> {
  type: typeof INPUT_HISTORY_UPDATE;
  payload: { value: string; index: number };
}

export function inputValueChanged(
  route: ChannelRoute,
  value: string,
): InputValueChanged {
  return { type: INPUT_VALUE_CHANGED, route, payload: { value } };
}

export function inputValueSent(
  route: ChannelRoute,
  value: string,
): InputValueSent {
  return { type: INPUT_VALUE_SENT, route, payload: { value } };
}

export function updateInputHistory(
  route: ChannelRoute,
  value: string,
  index: number,
): SetInputHistory {
  return {
    type: INPUT_HISTORY_UPDATE,
    route,
    payload: { value, index },
  };
}
