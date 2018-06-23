import {
  UpdateInputValueAction,
  UPDATE_INPUT_VALUE,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/input";
import { InputState } from "@app/reducers/input";
import { endOfHistory } from "@app/reducers/input/_helpers";

export type InputDirtyValueState = string;

export type InputDirtyValueAction =
  | UpdateInputValueAction
  | EnterInputValueAction;

export const inputDirtyValueInitialState: InputDirtyValueState = "";

export const reduceInputDirtyValue = (
  input: InputState,
  action: InputDirtyValueAction,
): InputDirtyValueState => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return endOfHistory(input.history)
        ? action.payload.value
        : input.dirtyValue;

    case ENTER_INPUT_VALUE:
      return "";

    default:
      return input.dirtyValue;
  }
};
