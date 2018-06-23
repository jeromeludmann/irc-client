import { Action } from "redux";

export const STATUS = "@status";
export const RAW = "@raw";
export const BROADCAST = "@all";
export const NONE = "@none";

export interface Route {
  serverKey: string;
  channelKey: string;
}

export interface RoutedAction extends Action<string> {
  route: Route;
}
