import { ServerScope } from "@app/types";
import { pipeToReducer } from "@app/pipeToReducer";
import server, { ServerState } from "@app/state/server";
import {
  ServerListTypes,
  AddServerAction,
  RemoveServerAction,
} from "@app/actions/server";

export interface ServerListState {
  [key: string]: ServerState;
}

export default function(
  servers: ServerListState = {},
  action: { scope: ServerScope } & (AddServerAction | RemoveServerAction),
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
