import { combineReducers } from "redux";
import servers, { ServerMapState } from "@app/state/servers";

export type RootState = {
  servers: ServerMapState;
};

export default combineReducers<RootState>({ servers });
