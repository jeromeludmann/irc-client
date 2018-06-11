import {
  INPUT_VALUE_CHANGE,
  INPUT_VALUE_SEND,
  ChangeInputValue,
  SendInputValue,
} from "@app/actions/input";
import { InputState } from "@app/state/input";
import { endOfHistory } from "@app/state/input/helpers";

export type DirtyValueState = string;

export type DirtyValueAction = ChangeInputValue | SendInputValue;

export const dirtyValueInitialState = "";

export function reduceDirtyValue(
  dirtyValue: DirtyValueState = dirtyValueInitialState,
  action: DirtyValueAction,
  input: InputState,
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case INPUT_VALUE_SEND:
      return "";

    default:
      return dirtyValue;
  }
}
