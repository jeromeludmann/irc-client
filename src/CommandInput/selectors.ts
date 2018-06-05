import { RootState } from "@app/reducers/rootReducer";
import { ChannelScope } from "@app/types";

export const getValue = (state: RootState, { server, channel }: ChannelScope) =>
  state.servers[server].channels[channel].commandInput.value;
