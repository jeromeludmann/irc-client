import { ServerScope } from "@app/types";
import { pipeReducer } from "@app/pipeReducer";
import server, { ServerState } from "@app/state/server";

export type ServerMapState = {
  [key: string]: ServerState;
};

type ServerMapAction =
  | {
      type: "ADD_SERVER";
      payload: ServerScope;
    }
  | {
      type: "REMOVE_SERVER";
      payload: ServerScope;
    };

const initialState: ServerMapState = {};

export default function(
  servers = initialState,
  action: ServerMapAction,
): ServerMapState {
  return pipeReducer({
    key: action.payload && action.payload.server,
    reducer: server,
    actionTypes: {
      add: "ADD_SERVER",
      remove: "REMOVE_SERVER",
    },
  })(servers, action);
}
