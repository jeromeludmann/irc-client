import { createSelector } from "reselect";
import { selectServer, selectWindow } from "@app/reducers/selectors";

export const selectBuffer = createSelector(
  selectServer,
  selectWindow,
  (server, active) => server.buffers[active.bufferKey],
);
