import { Action } from "redux";
import { CHANNEL_REGEXP } from "@app/helpers";

export interface Route {
  serverKey: string;
  channelKey: string;
}

export interface RoutedAction<T = string> extends Action<T> {
  route: Route;
}

export const STATUS = "@status";
export const RAW = "@raw";

export const BROADCAST_ALL = "@all";
export const BROADCAST_ACTIVE = "@active";
export const BROADCAST_NONE = "@none";

export const isRaw = (key: string) => key === RAW;
export const isStatus = (key: string) => key === STATUS;
export const isChannel = (key: string) => CHANNEL_REGEXP.test(key);
export const isPrivate = (key: string) =>
  !isRaw(key) && !isStatus(key) && !isChannel(key);
