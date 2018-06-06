import { ServerScope } from "@app/types";

export const ServerListTypes = {
  ADD: "SERVER/ADD",
  REMOVE: "SERVER/REMOVE",
};

export interface AddServerAction {
  type: typeof ServerListTypes.ADD;
  payload: ServerScope;
}

export interface RemoveServerAction {
  type: typeof ServerListTypes.REMOVE;
  payload: ServerScope;
}
