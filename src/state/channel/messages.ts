import { SendInputValue, INPUT_VALUE_SEND } from "@app/actions/input";

export type MessageListState = Message[];

interface Message {
  timestamp: number;
  value: string;
}

export type MessageListAction = SendInputValue;

export default function(
  messages: MessageListState = [],
  action: MessageListAction,
): MessageListState {
  switch (action.type) {
    case INPUT_VALUE_SEND:
      return [
        ...messages,
        {
          timestamp: Date.now(), // TODO remove me
          value: action.payload.value,
        },
      ];

    default:
      return messages;
  }
}
