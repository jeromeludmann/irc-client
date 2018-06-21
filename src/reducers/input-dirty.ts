import {
  UpdateInputValueAction,
  UPDATE_INPUT_VALUE,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/ui-input";
import { InputState } from "@app/reducers/input";
import { endOfHistory } from "@app/reducers/input-helpers";

export type DirtyValueState = string;

export type DirtyValueAction = UpdateInputValueAction | EnterInputValueAction;

export const dirtyValueInitialState: DirtyValueState = "";

export default (
  dirtyValue = dirtyValueInitialState,
  action: DirtyValueAction,
  input: InputState,
): DirtyValueState => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case ENTER_INPUT_VALUE:
      return "";

    default:
      return dirtyValue;
  }
};
