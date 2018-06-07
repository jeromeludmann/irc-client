import { RoutedAction, ServerRoute, ChannelRoute } from "@app/Route";

export const SERVER_REMOVE = "SERVER/REMOVE";
export const CHANNEL_REMOVE = "CHANNEL/REMOVE";

export interface RemoveServerAction {
  type: typeof SERVER_REMOVE;
  payload: { server: string };
}

export interface RemoveChannelAction extends RoutedAction<ServerRoute> {
  type: typeof CHANNEL_REMOVE;
  payload: { channel: string };
}
