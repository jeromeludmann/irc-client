import { createSelector } from "reselect";
import { getMessages } from "@app/MessageList/selectors";

export const getMessagesCount = createSelector(
  getMessages,
  messages => (messages ? messages.length : 0),
);
