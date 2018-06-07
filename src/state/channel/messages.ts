import { createSelector } from "reselect";
import { RootState } from "@app/state";
import { SentAction, INPUT_SENT } from "@app/input/types";

export type MessageListState = string[];

export default function(
  messages: MessageListState = [],
  { type, payload }: SentAction,
): MessageListState {
  switch (type) {
    case INPUT_SENT:
      return [...messages, payload.value];
    default:
      return messages;
  }
}

export const getMessages = (
  state: RootState,
  server: string,
  channel: string,
): MessageListState => state.servers[server].channels[channel].messages;

export const getMessagesCount = createSelector(
  getMessages,
  messages => (messages ? messages.length : 0),
);
