import { Scope } from "@app/types";
import { pipeToReducer } from "@app/pipeToReducer";
import server, { ServerState } from "@app/state/server";
import {
  ServerListTypes,
  AddServerAction,
  RemoveServerAction,
} from "@app/actions/server";
import { RootState } from "@app/state";

export interface ServerListState {
  [key: string]: ServerState;
}

export default function(
  servers: ServerListState = {},
  action: { scope: Scope } & (AddServerAction | RemoveServerAction),
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

export function getServers(state: RootState) {
  return state.servers;
}
