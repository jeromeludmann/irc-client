import { Scope } from "@app/types";
import { InputSentAction, InputActionTypes } from "@app/actions/input";
import { RootState } from "@app/state";
import { createSelector } from "reselect";

export type MessageListState = string[];

export default function(
  messages: MessageListState = [],
  { type, payload }: InputSentAction,
): MessageListState {
  switch (type) {
    case InputActionTypes.SENT:
      return [...messages, payload.value];
    default:
      return messages;
  }
}

export const getMessages = (
  { server, channel }: Scope,
  state: RootState,
): MessageListState =>
  channel
    ? state.servers[server].channels[channel].messages
    : state.servers[server].status.messages;

export const getMessagesCount = createSelector(
  getMessages,
  messages => (messages ? messages.length : 0),
);
