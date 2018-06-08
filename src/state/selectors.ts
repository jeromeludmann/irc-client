import { ChannelRoute } from "@app/Route";
import { RootState } from "@app/state";

export function selectInput({ server, channel }: ChannelRoute, state: RootState) {
  return state.servers[server].channels[channel].input;
}
