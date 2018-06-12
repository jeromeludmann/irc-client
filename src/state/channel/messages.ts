import { Action } from "redux";

export type MessageListState = Message[];

interface Message {
  readonly timestamp: number;
  readonly value: string;
}

export type MessageListAction = Action;

export const messagesInitialState: MessageListState = [];

export default function(
  messages = messagesInitialState,
  action: MessageListAction,
): MessageListState {
  switch (action.type) {
    default:
      return messages;
  }
}
