import { combineReducers } from "redux";
import { pipingReducer } from "@app/reducers/pipingReducer";
import { ChannelState, channelReducer } from "@app/Channel/reducers";
import { ChannelScope } from "@app/types";

// Name

type NameState = string;

type NameAction = {
  type: "SET_NAME";
  payload: { name: string };
};

const nameInitialState: NameState = "";

const nameReducer = (
  name = nameInitialState,
  action: NameAction,
): NameState => {
  switch (action.type) {
    case "SET_NAME":
      return action.payload.name;
    default:
      return name;
  }
};

// Modes

type ModesState = string[];
const modesInitialState: ModesState = [];
const modesReducer = (modes = modesInitialState): ModesState => modes;

// Channels

type ChannelsState = {
  [key: string]: ChannelState;
};

interface ChannelsAction {
  type: "ADD_CHANNEL";
  payload: ChannelScope;
}

const channelsInitialState: ChannelsState = {};

const channelsReducer = (
  channels = channelsInitialState,
  action: ChannelsAction,
): ChannelsState =>
  pipingReducer({
    key: action.payload && action.payload.channel,
    reducer: channelReducer,
    actionTypes: {
      add: "ADD_CHANNEL",
      remove: "REMOVE_CHANNEL",
    },
  })(channels, action);

// Server

export type ServerState = {
  name: NameState;
  modes: ModesState;
  channels: ChannelsState;
};

export const serverReducer = combineReducers<ServerState>({
  name: nameReducer,
  modes: modesReducer,
  channels: channelsReducer,
});
