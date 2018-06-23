import { createSelector } from "reselect";
import { selectChannel } from "@app/reducers/server/_selectors";

export const selectMessages = createSelector(
  selectChannel,
  channel => channel.messages,
);

export const selectInput = createSelector(selectChannel, channel => channel.input);
