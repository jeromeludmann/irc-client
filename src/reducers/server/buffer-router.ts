import { Action } from "redux";
import reduceBuffer, {
  BufferState,
  bufferInitialState,
} from "@app/reducers/buffer/buffer";
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

const registry: {
  [bufferKey: string]: (
    bufferRouter: BufferRouterState,
    action: BufferRouterAction,
    params: ExtraParams,
  ) => BufferRouterState;
} = {
  [NO_BUFFER](bufferRouter) {
    return bufferRouter;
  },
  [ALL_BUFFERS](bufferRouter, action, params) {
    const buffers: { [key: string]: BufferState } = {};
    Object.keys(bufferRouter).forEach(key => {
      if (key !== RAW_BUFFER) {
        buffers[key] = reduceBuffer(bufferRouter[key], action, params);
      }
    });
    return { ...bufferRouter, ...buffers };
  },
};

export default (
  bufferRouter = bufferRouterInitialState,
  action: BufferRouterAction,
  params: ExtraParams,
): BufferRouterState => {
  const bufferKey = params.route.bufferKey;

  if (registry.hasOwnProperty(bufferKey)) {
    return registry[bufferKey](bufferRouter, action, params);
  }

  return bufferKey
    ? {
        ...bufferRouter,
        [bufferKey]: reduceBuffer(bufferRouter[bufferKey], action, params),
      }
    : bufferRouter;
};
