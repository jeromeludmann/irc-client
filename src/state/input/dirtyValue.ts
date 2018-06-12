import { INPUT_VALUE_CHANGE, ChangeInputValue } from "@app/actions/input";
import { InputState } from "@app/state/input";
import { endOfHistory } from "@app/state/input/helpers";
import { SendMessage, SOCKET_WRITE } from "@app/actions/irc";

export type DirtyValueState = string;

export type DirtyValueAction = ChangeInputValue | SendMessage;

export const dirtyValueInitialState: DirtyValueState = "";

export function reduceDirtyValue(
  dirtyValue = dirtyValueInitialState,
  action: DirtyValueAction,
  input: InputState,
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case SOCKET_WRITE:
      return "";

    default:
      return dirtyValue;
  }
}
