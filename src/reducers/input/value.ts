import { Action } from "redux";
import {
  UpdateInputValueAction,
  UPDATE_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  ENTER_INPUT_VALUE,
} from "@app/actions/ui";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";
import { InputState } from "@app/reducers/input";

export type InputValueState = string;

export const inputValueInitialState: InputValueState = "";

type InputValueReducer<A = Action> = (
  value: InputValueState,
  action: A,
  extraStates: { input: InputState },
) => InputValueState;

const handlers: { [action: string]: InputValueReducer } = {
  [UPDATE_INPUT_VALUE]: (_, action: UpdateInputValueAction) =>
    action.payload.value,

  [ENTER_INPUT_VALUE]: _ => "",

  [GO_BACK_INPUT_HISTORY]: (value, _, { input }) =>
    beginOfHistory(input.history)
      ? value
      : input.history.values[input.history.index - 1],

  [GO_FORWARD_INPUT_HISTORY]: (value, _, { input }) =>
    endOfHistory(input.history)
      ? value
      : input.history.values[input.history.index + 1] || input.dirtyValue,
};

export const reduceInputValue = (
  inputValueState = inputValueInitialState,
  action: Action,
  extraStates: { input: InputState },
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](inputValueState, action, extraStates)
    : inputValueState;
