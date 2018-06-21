import { createSelector } from "reselect";
import { selectServer, selectActiveBuffer } from "@app/reducers/selectors";

export const selectWindow = createSelector(
  selectServer,
  selectActiveBuffer,
  (server, active) => server.buffers[active.bufferKey],
);
