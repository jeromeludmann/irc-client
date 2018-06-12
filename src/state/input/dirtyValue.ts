import { INPUT_VALUE_CHANGE, ChangeInputValue } from "@app/actions/input";
import { InputState } from "@app/state/input";
import { endOfHistory } from "@app/state/input/helpers";
import { SendCommand, SEND_COMMAND } from "@app/actions/irc";

export type DirtyValueState = string;

export type DirtyValueAction = ChangeInputValue | SendCommand;

export function reduceDirtyValue(
  dirtyValue: DirtyValueState,
  action: DirtyValueAction,
  input: InputState,
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case SEND_COMMAND:
      return "";

    default:
      return dirtyValue;
  }
}
