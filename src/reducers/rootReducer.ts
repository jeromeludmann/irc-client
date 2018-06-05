import { combineReducers } from "redux";
import { pipingReducer } from "@app/reducers/pipingReducer";
import { ServerState, serverReducer } from "@app/reducers/serverReducers";
import { ServerScope } from "@app/types";

type ServersState = {
  [key: string]: ServerState;
};

type ServersAction =
  | {
      type: "ADD_SERVER";
      payload: ServerScope;
    }
  | {
      type: "REMOVE_SERVER";
      payload: ServerScope;
    };

const serversInitialState: ServersState = {};

const serversReducer = (
  servers = serversInitialState,
  action: ServersAction,
): ServersState =>
  pipingReducer({
    key: action.payload && action.payload.server,
    reducer: serverReducer,
    actionTypes: {
      add: "ADD_SERVER",
      remove: "REMOVE_SERVER",
    },
  })(servers, action);

// Root

export type RootState = {
  servers: ServersState;
};

export const rootReducer = combineReducers<RootState>({
  servers: serversReducer,
});
