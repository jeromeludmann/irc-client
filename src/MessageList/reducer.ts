import { ChannelScope } from "@app/types";

export type MessageListState = string[];

interface MessageListAction {
  type: "COMMAND_SENT";
  payload: ChannelScope & { value: string };
}

const messagesInitialState: MessageListState = [];

export const messageListReducer = (
  state = messagesInitialState,
  { type, payload }: MessageListAction,
): MessageListState => {
  switch (type) {
    case "COMMAND_SENT":
      return [...state, payload.value];
    default:
      return state;
  }
};
