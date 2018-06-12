import { SendCommand, SEND_COMMAND } from "@app/actions/irc";

export type MessageListState = Message[];

interface Message {
  readonly timestamp: number;
  readonly value: string;
}

export type MessageListAction = SendCommand;

export default function(
  messages: MessageListState,
  action: MessageListAction,
): MessageListState {
  switch (action.type) {
    case SEND_COMMAND:
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
