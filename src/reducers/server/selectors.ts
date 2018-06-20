import { createSelector } from "reselect";
import { selectServer, selectActiveWindow } from "@app/reducers/selectors";

export const selectWindow = createSelector(
  selectServer,
  selectActiveWindow,
  (server, active) => server.windows[active.window],
);
