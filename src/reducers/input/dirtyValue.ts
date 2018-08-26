import {
  UpdateInputValueAction,
  UPDATE_INPUT_VALUE,
  ENTER_INPUT_VALUE,
  EnterInputValueAction,
} from "@app/actions/ui";
import { InputState } from "@app/reducers/input";
import { endOfHistory } from "@app/reducers/input/_helpers";
import { Action } from "redux";

export type InputDirtyValueState = string;

export const inputDirtyValueInitialState: InputDirtyValueState = "";

type InputDirtyValueReducer<A = Action> = (
  dirtyValue: InputDirtyValueState,
  action: A,
  extraStates: { input: InputState },
) => InputDirtyValueState;

const updateInputValue: InputDirtyValueReducer<UpdateInputValueAction> = (
  dirtyValue,
  action,
  { input },
) => (endOfHistory(input.history) ? action.payload.value : dirtyValue);

const enterInputValue: InputDirtyValueReducer<EnterInputValueAction> = _ => "";

const map: { [action: string]: InputDirtyValueReducer } = {
  [UPDATE_INPUT_VALUE]: updateInputValue,
  [ENTER_INPUT_VALUE]: enterInputValue,
};

export const reduceInputDirtyValue = (
  dirtyValueState = inputDirtyValueInitialState,
  action: Action,
  extraStates: { input: InputState },
) =>
  map.hasOwnProperty(action.type)
    ? map[action.type](dirtyValueState, action, extraStates)
    : dirtyValueState;
