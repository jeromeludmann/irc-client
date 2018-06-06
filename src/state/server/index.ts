import { combineReducers } from "redux";
import modes, { ModesState } from "@app/state/server/modes";
import channels, { ChannelListState } from "@app/state/server/channels";
import status, { ChannelState } from "@app/state/channel";

export type ServerState = {
  modes: ModesState;
  status: ChannelState;
  channels: ChannelListState;
};

export default combineReducers<ServerState>({ modes, status, channels });
