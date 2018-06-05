import { combineReducers } from "redux";
import servers, { ServerMapState } from "@app/state/server-map";

export type RootState = {
  servers: ServerMapState;
};

export default combineReducers<RootState>({ servers });
