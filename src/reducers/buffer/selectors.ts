import { createSelector } from "reselect";
import { selectBuffer } from "@app/reducers/server/selectors";

export const selectMessages = createSelector(
  selectBuffer,
  buffer => buffer.messages,
);

export const selectInput = createSelector(selectBuffer, buffer => buffer.input);
