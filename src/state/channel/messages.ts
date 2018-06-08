import { createSelector } from "reselect";
import { RootState } from "@app/state";
import { InputValueSent, INPUT_VALUE_SENT } from "@app/actions/input";

interface Message {
  timestamp: number;
  value: string;
}

export type MessageListState = Message[];

export default function(
  messages: MessageListState = [],
  { type, payload }: InputValueSent,
): MessageListState {
  switch (type) {
    case INPUT_VALUE_SENT:
      return [
        ...messages,
        {
          timestamp: Date.now(),
          value: payload.value,
        },
      ];
    default:
      return messages;
  }
}

export const selectMessages = ({
  servers,
  active: { server, channel },
}: RootState): MessageListState => servers[server].channels[channel].messages;

export const getMessagesCount = createSelector(
  selectMessages,
  messages => (messages ? messages.length : 0),
);
