import { createSelector } from "reselect";
import { AppState } from "@app/reducers";
import { ServersState } from "@app/reducers/servers";
import { RouteState } from "@app/reducers/route";

export const selectServers = ({ servers }: AppState): ServersState => servers;

export const selectRoute = ({ route }: AppState): RouteState => route;

export const selectServer = createSelector(
  selectServers,
  selectRoute,
  (servers, { serverKey }) => servers[serverKey],
);
