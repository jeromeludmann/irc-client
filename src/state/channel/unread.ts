import { AnyAction } from "redux";
import { ActiveState } from "@app/state/active";

export type UnreadState = boolean;

export type UnreadAction = AnyAction; // TODO add action types

interface ExtraParams {
  readonly active: ActiveState;
}

export const unreadInitialState: UnreadState = false;

export default function(
  unread = unreadInitialState,
  action: UnreadAction,
  { active }: ExtraParams,
): UnreadState {
  if (!active) {
    // TODO
    return false;
  }
  switch (action.type) {
    default:
      return unread;
  }
}
