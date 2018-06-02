import { combineReducers } from "redux";
import { itemsReducer } from "@app/reducers/itemsReducer";
import { ServerState, serverReducer } from "@app/reducers/serverReducers";

type ServersState = {
  [key: string]: ServerState;
};

type ServersAction =
  | {
      type: "ADD_SERVER";
      payload: { server: string };
    }
  | {
      type: "REMOVE_SERVER";
      payload: { server: string };
    };

const serversInitialState: ServersState = {};

const serversReducer = (
  servers = serversInitialState,
  action: ServersAction,
): ServersState =>
  itemsReducer({
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
