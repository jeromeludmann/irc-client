import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";

export type MessageListState = string[];

interface MessageListAction {
  type: "INPUT_SENT";
  payload: ChannelScope & { value: string };
}

const messagesInitialState: MessageListState = [];

export default function(
  state = messagesInitialState,
  { type, payload }: MessageListAction,
): MessageListState {
  switch (type) {
    case "INPUT_SENT":
      return [...state, payload.value];
    default:
      return state;
  }
}

export function getMessages(
  state: RootState,
  { server, channel }: ChannelScope,
) {
  return state.servers[server].channels[channel].messages;
}
