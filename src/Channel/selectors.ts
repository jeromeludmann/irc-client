import { createSelector } from "reselect";
import { RootState } from "@app/reducers/rootReducer";

export const getMessages = (
  state: RootState,
  { server, channel }: { server: string; channel: string },
) => state.servers[server].channels[channel].messages;

export const getMessagesCount = createSelector(
  getMessages,
  messages => (messages ? messages.length : 0),
);
