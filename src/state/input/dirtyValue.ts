import { ChangeInputValueAction, CHANGE_INPUT_VALUE } from "@app/actions/ui/input";
import { InputState } from "@app/state/input";
import { endOfHistory } from "@app/state/input/helpers";
import { CommandAction, SEND_COMMAND } from "@app/actions/commands";

export type DirtyValueState = string;

export type DirtyValueAction = ChangeInputValueAction | CommandAction;

export const dirtyValueInitialState: DirtyValueState = "";

export function reduceDirtyValue(
  dirtyValue = dirtyValueInitialState,
  action: DirtyValueAction,
  input: InputState,
) {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return endOfHistory(input.history) ? action.payload.value : dirtyValue;

    case SEND_COMMAND:
      return "";

    default:
      return dirtyValue;
  }
}
