import { combineReducers } from "redux";
import servers, { ServerListState } from "@app/state/servers";
import current, { CurrentState } from "@app/state/current";

export type RootState = {
  servers: ServerListState;
  current: CurrentState;
};

export default combineReducers<RootState>({ servers, current });
