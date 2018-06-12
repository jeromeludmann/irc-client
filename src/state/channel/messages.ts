import { Action } from "redux";

export type MessageListState = Message[];

interface Message {
  readonly timestamp: number;
  readonly value: string;
}

export type MessageListAction = Action;

export default function(
  messages: MessageListState,
  action: MessageListAction,
): MessageListState {
  switch (action.type) {
    default:
      return messages;
  }
}
