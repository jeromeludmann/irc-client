import { Action } from "redux";
import reduceBuffer, {
  BufferState,
  bufferInitialState,
} from "@app/reducers/buffer";
import {
  Route,
  STATUS_BUFFER,
  RAW_BUFFER,
  ALL_BUFFERS,
  NO_BUFFER,
} from "@app/Route";
import { WindowState } from "@app/reducers/window";
import { UserState } from "@app/reducers/user";

export interface BufferRouterState {
  readonly [key: string]: BufferState;
}

export type BufferRouterAction = Action;

interface ExtraParams {
  readonly user: UserState;
  readonly route: Route;
  readonly active: WindowState;
}

export const bufferRouterInitialState: BufferRouterState = {
  [RAW_BUFFER]: bufferInitialState,
  [STATUS_BUFFER]: bufferInitialState,
};

export default (
  bufferRouter = bufferRouterInitialState,
  action: BufferRouterAction,
  params: ExtraParams,
): BufferRouterState => {
  switch (params.route.bufferKey) {
    case NO_BUFFER:
      return bufferRouter;

    case ALL_BUFFERS:
      const buffers: { [key: string]: BufferState } = {};
      Object.keys(bufferRouter).forEach(key => {
        buffers[key] = reduceBuffer(bufferRouter[key], action, params);
      });
      return buffers;

    case RAW_BUFFER:
    case STATUS_BUFFER:
    default:
      return params.route.bufferKey
        ? {
            ...bufferRouter,
            [params.route.bufferKey]: reduceBuffer(
              bufferRouter[params.route.bufferKey],
              action,
              params,
            ),
          }
        : bufferRouter;
  }
};
