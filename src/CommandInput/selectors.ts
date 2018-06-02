import { RootState } from "@app/reducers/rootReducer";

export const getValue = (
  state: RootState,
  { server, channel }: { server: string; channel: string },
) => state.servers[server].channels[channel].commandInput.value;
