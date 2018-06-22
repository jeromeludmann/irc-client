import {
  UpdateInputValueAction,
  UPDATE_INPUT_VALUE,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/input";
import { InputState } from "@app/reducers/input/input";
import { endOfHistory } from "@app/reducers/input/_helpers";

export type DirtyState = string;

export type DirtyAction = UpdateInputValueAction | EnterInputValueAction;

export const dirtyInitialState: DirtyState = "";

export default (
  dirty = dirtyInitialState,
  action: DirtyAction,
  input: InputState,
): DirtyState => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return endOfHistory(input.history) ? action.payload.value : dirty;

    case ENTER_INPUT_VALUE:
      return "";

    default:
      return dirty;
  }
};
