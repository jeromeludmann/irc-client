import { createSelector } from "reselect";
import { RootState } from "@app/reducers";
import { UserState } from "@app/reducers/user";
import { ServerRouterState } from "@app/reducers/server-router";
import { ActiveWindowState } from "@app/reducers/active";

export const selectUser = ({ user }: RootState): UserState => user;

export const selectServers = ({ servers }: RootState): ServerRouterState =>
  servers;

export const selectActiveWindow = ({ active }: RootState): ActiveWindowState =>
  active;

export const selectServer = createSelector(
  selectServers,
  selectActiveWindow,
  (servers, { server }) => servers[server],
);
