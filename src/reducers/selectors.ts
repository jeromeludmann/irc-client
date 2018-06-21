import { createSelector } from "reselect";
import { RootState } from "@app/reducers";
import { UserState } from "@app/reducers/user";
import { ServerRouterState } from "@app/reducers/server-router";
import { WindowState } from "@app/reducers/window";

export const selectUser = ({ user }: RootState): UserState => user;

export const selectServers = ({ servers }: RootState): ServerRouterState =>
  servers;

export const selectWindow = ({ active }: RootState): WindowState => active;

export const selectServer = createSelector(
  selectServers,
  selectWindow,
  (servers, { serverKey }) => servers[serverKey],
);
