export interface CurrentState {
  server: string;
  channel?: string;
}

export default function reduceCurrent(
  current: CurrentState = { server: "server" }, // TODO no default?
  { type, payload }: any,
) {
  switch (type) {
    case "APP/SWITCH_CHANNEL":
      return { server: payload.server, channel: payload.channel };
    default:
      return current;
  }
}
