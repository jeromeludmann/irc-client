import { createSelector } from "reselect";
import { RootState } from "@app/reducers";
import { ServersState } from "@app/reducers/servers";
import { RouteState } from "@app/reducers/route";

export const selectServers = ({ servers }: RootState): ServersState => servers;

export const selectRoute = ({ route }: RootState): RouteState => route;

export const selectServer = createSelector(
  selectServers,
  selectRoute,
  (servers, { serverKey }) => servers[serverKey],
);
