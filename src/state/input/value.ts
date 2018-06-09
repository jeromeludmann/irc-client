import {
  INPUT_VALUE_CHANGE,
  INPUT_VALUE_SEND,
  INPUT_HISTORY_BACK,
  INPUT_HISTORY_FORWARD,
  ChangeInputValue,
  SendInputValue,
  GoBackInputHistory,
  GoForwardInputHistory,
} from "@app/actions/input";
import { InputState } from "@app/state/input";
import { beginOfHistory, endOfHistory } from "@app/state/input/helpers";

export type ValueState = string;

export type ValueAction =
  | ChangeInputValue
  | SendInputValue
  | GoBackInputHistory
  | GoForwardInputHistory;

export const valueInitialState = "";

export function reduceValue(
  value: ValueState = valueInitialState,
  action: ValueAction,
  input: InputState,
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return action.payload.value;

    case INPUT_VALUE_SEND:
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
