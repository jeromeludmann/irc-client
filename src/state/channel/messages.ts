import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import { SendInputAction, InputTypes } from "@app/state/input";

export type MessageListState = string[];

type Action = SendInputAction;

const initialState: MessageListState = [];

export default function(
  state = initialState,
  { type, payload }: Action,
): MessageListState {
  switch (type) {
    case InputTypes.SEND:
      return [...state, payload.value];
    default:
      return state;
  }
}

export function getMessages(
  { server, channel }: ChannelScope,
  state: RootState,
): MessageListState {
  return state.servers[server].channels[channel].messages;
}
