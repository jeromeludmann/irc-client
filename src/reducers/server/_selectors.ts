import { createSelector } from "reselect";
import { selectServer, selectRoute } from "@app/reducers/_selectors";

export const selectUser = createSelector(selectServer, server => server.user);

export const selectChannel = createSelector(
  selectServer,
  selectRoute,
  (server, active) => server.channels[active.channelKey],
);
