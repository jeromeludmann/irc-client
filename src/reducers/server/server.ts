import reduceModes, {
  ModesState,
  modesInitialState,
} from "@app/reducers/server/modes";
import { WindowState } from "@app/reducers/window";
import reduceBufferRouter, {
  BufferRouterState,
  bufferRouterInitialState,
  BufferRouterAction,
} from "@app/reducers/server/buffer-router";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";
import { RPL_MYINFO, IncomingReplyMyInfoAction } from "@app/actions/incoming";
import { Action } from "redux";

export type ServerState = {
  readonly name: string; // TODO
  readonly availableModes: { user: string[]; channel: string[] }; // TODO
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
  name: "<unknown>", // TODO
  availableModes: { user: [], channel: [] }, // TODO
  modes: modesInitialState,
  buffers: bufferRouterInitialState,
};

// TODO extract me
function reduceName(name: string, action: IncomingReplyMyInfoAction) {
  switch (action.type) {
    case RPL_MYINFO:
      return action.payload.serverName;
    default:
      return name;
  }
}

// TODO extract me
function reduceAvailableModes(
  availableModes: any,
  action: IncomingReplyMyInfoAction,
) {
  switch (action.type) {
    case RPL_MYINFO:
      return {
        user: action.payload.availableUserModes,
        channel: action.payload.availableChannelModes,
      };
    default:
      return availableModes;
  }
}

export default (
  server = serverInitialState,
  action: ServerAction,
  params: ExtraParams,
): ServerState => ({
  name: reduceName(server.name, action as IncomingReplyMyInfoAction),
  availableModes: reduceAvailableModes(
    server.availableModes,
    action as IncomingReplyMyInfoAction,
  ),
  modes: reduceModes(server.modes),
  buffers: reduceBufferRouter(
    server.buffers,
    action as BufferRouterAction,
    params,
  ),
});
