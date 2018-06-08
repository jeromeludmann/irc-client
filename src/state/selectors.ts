import { ChannelRoute } from "@app/Route";
import { RootState } from "@app/state";
import { InputState } from "@app/state/input/input";

export const selectInput = (
  { server, channel }: ChannelRoute,
  state: RootState,
): InputState => state.servers[server].channels[channel].input;
