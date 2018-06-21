import { Action } from "redux";
import reduceModes, {
  ModesState,
  modesInitialState,
} from "@app/reducers/server-modes";
import { WindowState } from "@app/reducers/window";
import reduceBufferRouter, {
  BufferRouterState,
  bufferRouterInitialState,
  BufferRouterAction,
} from "@app/reducers/server-buffers";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

export type ServerState = {
  readonly modes: ModesState;
  readonly buffers: BufferRouterState;
};

export type ServerAction = Action;

interface ExtraParams {
  user: UserState;
  route: Route;
  active: WindowState;
}

export const serverInitialState: ServerState = {
  modes: modesInitialState,
  buffers: bufferRouterInitialState,
};

export default (
  server = serverInitialState,
  action: ServerAction,
  params: ExtraParams,
): ServerState => ({
  modes: reduceModes(server.modes),
  buffers: reduceBufferRouter(
    server.buffers,
    action as BufferRouterAction,
    params,
  ),
});
