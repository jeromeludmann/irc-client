import { createSelector } from "reselect";
import { RootState } from "@app/state";
import { ServerRouterState } from "@app/state/server-router";
import { ActiveRouteState } from "@app/state/active";

export const selectServers = ({ servers }: RootState): ServerRouterState =>
  servers;

export const selectActiveRoute = ({ active }: RootState): ActiveRouteState => active;

export const selectServer = createSelector(
  selectServers,
  selectActiveRoute,
  (servers, { server }) => servers[server],
);
