import { ServerScope } from "@app/types";
import { pipeToReducer } from "@app/pipeToReducer";
import server, { ServerState } from "@app/state/server";

export interface ServerListState {
  [key: string]: ServerState;
}

export const ServerListTypes = {
  ADD: "SERVER/ADD",
  REMOVE: "SERVER/REMOVE",
};

interface AddServerAction {
  type: typeof ServerListTypes.ADD;
  payload: ServerScope;
}

interface RemoveServerAction {
  type: typeof ServerListTypes.REMOVE;
  payload: ServerScope;
}

type Action = { scope: ServerScope } & (AddServerAction | RemoveServerAction);

const initialState: ServerListState = {};

export default function(
  servers = initialState,
  action: Action,
): ServerListState {
  return pipeToReducer({
    key: action.scope && action.scope.server,
    reducer: server,
    actionTypes: {
      add: ServerListTypes.ADD,
      remove: ServerListTypes.REMOVE,
    },
  })(servers, action);
}
