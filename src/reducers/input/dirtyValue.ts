import {
  ChangeInputValueAction,
  CHANGE_INPUT_VALUE,
  SEND_INPUT_VALUE,
  SendInputValueAction,
} from "@app/actions/ui/input";
import { InputState } from "@app/reducers/input";
import { endOfHistory } from "@app/reducers/input/helpers";

export type DirtyValueState = string;

export type DirtyValueAction = ChangeInputValueAction | SendInputValueAction;

export const dirtyValueInitialState: DirtyValueState = "";

export default (
  dirtyValue = dirtyValueInitialState,
  action: DirtyValueAction,
  input: InputState,
): DirtyValueState => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case SEND_INPUT_VALUE:
      return "";

    default:
      return dirtyValue;
  }
};
