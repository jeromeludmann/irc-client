import { ChannelScope } from "@app/types";

export const ChannelListTypes = {
  ADD: "CHANNEL/ADD",
  REMOVE: "CHANNEL/REMOVE",
};

export interface AddChannelAction {
  type: typeof ChannelListTypes.ADD;
  payload: ChannelScope;
}

export interface RemoveChannelAction {
  type: typeof ChannelListTypes.REMOVE;
  payload: ChannelScope;
}
