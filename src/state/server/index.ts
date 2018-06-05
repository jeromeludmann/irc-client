import { combineReducers } from "redux";
import modes, { ModesState } from "@app/state/server/modes";
import channels, { ChannelListState } from "@app/state/server/channels";

export type ServerState = {
  modes: ModesState;
  channels: ChannelListState;
};

export default combineReducers<ServerState>({ modes, channels });
