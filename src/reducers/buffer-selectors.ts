import { createSelector } from "reselect";
import { selectWindow } from "@app/reducers/server-selectors";

export const selectMessages = createSelector(
  selectWindow,
  window => window.messages,
);

export const selectInput = createSelector(selectWindow, window => window.input);
