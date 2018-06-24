import {
  UpdateInputValueAction,
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  UPDATE_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/ui";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";
import { InputState } from "@app/reducers/input";
import { mapReducer } from "@app/reducers/_map";
import { Action } from "redux";

export type InputValueState = string;

export const inputValueInitialState: InputValueState = "";

type InputValueReducer<A = Action> = (
  value: InputValueState,
  action: A,
  extraStates: { input: InputState },
) => InputValueState;

const updateInputValue: InputValueReducer<UpdateInputValueAction> = (
  _,
  action,
) => action.payload.value;

const enterInputValue: InputValueReducer<EnterInputValueAction> = _ => "";

const goBackInputHistory: InputValueReducer<GoBackInputHistoryAction> = (
  value,
  _,
  { input },
) =>
  beginOfHistory(input.history)
    ? value
    : input.history.values[input.history.index - 1];

const goForwardInputHistory: InputValueReducer<GoForwardInputHistoryAction> = (
  value,
  _,
  { input },
) =>
  endOfHistory(input.history)
    ? value
    : input.history.values[input.history.index + 1] || input.dirtyValue;

const map: { [action: string]: InputValueReducer } = {
  [UPDATE_INPUT_VALUE]: updateInputValue,
  [ENTER_INPUT_VALUE]: enterInputValue,
  [GO_BACK_INPUT_HISTORY]: goBackInputHistory,
  [GO_FORWARD_INPUT_HISTORY]: goForwardInputHistory,
};

export const reduceInputValue = mapReducer<
  InputValueState,
  { input: InputState }
>(map);
