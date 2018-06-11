import { createSelector } from "reselect";
import { selectServer, selectActiveRoute } from "@app/state/selectors";

export const selectChannel = createSelector(
  selectServer,
  selectActiveRoute,
  (server, active) => server.channels[active.channel],
);
