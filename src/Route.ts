export type RoutedAction<T> = {
  type: string;
  route: T;
};

export interface ServerRoute {
  server: string;
}

export interface ChannelRoute extends ServerRoute {
  channel: string;
}
