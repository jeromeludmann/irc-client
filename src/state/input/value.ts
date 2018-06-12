import {
  INPUT_VALUE_CHANGE,
  INPUT_HISTORY_BACK,
  INPUT_HISTORY_FORWARD,
  ChangeInputValue,
  GoBackInputHistory,
  GoForwardInputHistory,
} from "@app/actions/input";
import { InputState } from "@app/state/input";
import { beginOfHistory, endOfHistory } from "@app/state/input/helpers";
import { SendCommand, SEND_COMMAND } from "@app/actions/irc";

export type ValueState = string;

export type ValueAction =
  | ChangeInputValue
  | SendCommand
  | GoBackInputHistory
  | GoForwardInputHistory;

export function reduceValue(
  value: ValueState,
  action: ValueAction,
  input: InputState,
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return action.payload.value;

    case SEND_COMMAND:
      return "";

    case INPUT_HISTORY_BACK:
      return beginOfHistory(input.history)
        ? value
        : input.history.values[input.history.index - 1];

    case INPUT_HISTORY_FORWARD:
      return endOfHistory(input.history)
        ? value
        : input.history.values[input.history.index + 1] || input.dirtyValue;

    default:
      return value;
  }
}
