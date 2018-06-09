import { createSelector } from "reselect";
import { RootState } from "@app/state";
import { ServerRouterState } from "@app/state/server-router";
import { ActiveState } from "@app/state/active";

export const selectServers = ({ servers }: RootState): ServerRouterState =>
  servers;

export const selectActiveRoute = ({ active }: RootState): ActiveState => active;

export const selectServer = createSelector(
  selectServers,
  selectActiveRoute,
  (servers, { server }) => servers[server],
);
