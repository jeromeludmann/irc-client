export type ServerScope = {
  server: string;
};

export type ChannelScope = ServerScope & {
  channel: string;
};
