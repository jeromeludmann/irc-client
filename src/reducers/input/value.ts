import {
  ChangeInputValueAction,
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  CHANGE_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  SEND_INPUT_VALUE,
  SendInputValueAction,
} from "@app/actions/ui/input";
import { InputState } from "@app/reducers/input";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/helpers";

export type ValueState = string;

export type ValueAction =
  | ChangeInputValueAction
  | SendInputValueAction
  | GoBackInputHistoryAction
  | GoForwardInputHistoryAction;

export const valueInitialState: ValueState = "";

export default (
  value = valueInitialState,
  action: ValueAction,
  input: InputState,
): ValueState => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return action.payload.value;

    case SEND_INPUT_VALUE:
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
};
