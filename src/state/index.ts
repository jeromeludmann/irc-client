import { combineReducers } from "redux";
import servers, { ServerListState } from "@app/state/servers";

export type RootState = {
  servers: ServerListState;
};

export default combineReducers<RootState>({ servers });
