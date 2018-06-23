import {
  UpdateInputValueAction,
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  UPDATE_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/input";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";
import { InputState } from "@app/reducers/input";

export type InputValueState = string;

export type InputValueAction =
  | UpdateInputValueAction
  | EnterInputValueAction
  | GoBackInputHistoryAction
  | GoForwardInputHistoryAction;

export const inputValueInitialState: InputValueState = "";

export const reduceInputValue = (
  input: InputState,
  action: InputValueAction,
): InputValueState => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return action.payload.value;

    case ENTER_INPUT_VALUE:
      return "";

    case GO_BACK_INPUT_HISTORY:
      return beginOfHistory(input.history)
        ? input.value
        : input.history.values[input.history.index - 1];

    case GO_FORWARD_INPUT_HISTORY:
      return endOfHistory(input.history)
        ? input.value
        : input.history.values[input.history.index + 1] || input.dirtyValue;

    default:
      return input.value;
  }
};
