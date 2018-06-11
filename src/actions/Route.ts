import { Action } from "redux";

export interface Route {
  server: string;
  channel: string;
}

export type RoutedAction = Action & {
  route: Route;
};
