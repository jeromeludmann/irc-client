import { ChannelScope } from "@app/types";

export const updateCommand = (
  command: string,
  { server, channel }: ChannelScope,
) => ({
  type: "COMMAND_CHANGED",
  payload: { server, channel, value: command },
});

export const sendCommand = (
  command: string,
  { server, channel }: ChannelScope,
) => ({
  type: "COMMAND_SENT",
  payload: { server, channel, value: command },
});
