import { Action } from "redux";

export interface Route {
  server: string;
  channel: string;
}

export interface Routable extends Action<string> {
  route: Route;
}
