import { combineReducers } from "redux";
import servers, { ServerListState } from "@app/state/servers";
import active, { ActiveState } from "@app/state/active";

export type RootState = {
  servers: ServerListState;
  active: ActiveState;
};

export default combineReducers<RootState>({ servers, active });
