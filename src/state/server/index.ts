import { combineReducers } from "redux";
import name, { NameState } from "@app/state/server/name";
import modes, { ModesState } from "@app/state/server/modes";
import channels, { ChannelMapState } from "@app/state/server/channels";

export type ServerState = {
  name: NameState;
  modes: ModesState;
  channels: ChannelMapState;
};

export default combineReducers<ServerState>({ name, modes, channels });
