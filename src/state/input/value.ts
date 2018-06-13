import {
  ChangeInputValueAction,
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  CHANGE_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
} from "@app/actions/ui/input";
import { InputState } from "@app/state/input";
import { beginOfHistory, endOfHistory } from "@app/state/input/helpers";
import { CommandAction, SEND_COMMAND } from "@app/actions/commands";

export type ValueState = string;

export type ValueAction =
  | ChangeInputValueAction
  | CommandAction
  | GoBackInputHistoryAction
  | GoForwardInputHistoryAction;

export const valueInitialState: ValueState = "";

export function reduceValue(
  value = valueInitialState,
  action: ValueAction,
  input: InputState,
) {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return action.payload.value;

    case SEND_COMMAND:
      return "";

    case GO_BACK_INPUT_HISTORY:
      return beginOfHistory(input.history)
        ? value
        : input.history.values[input.history.index - 1];

    case GO_FORWARD_INPUT_HISTORY:
      return endOfHistory(input.history)
        ? value
        : input.history.values[input.history.index + 1] || input.dirtyValue;

    default:
      return value;
  }
}
