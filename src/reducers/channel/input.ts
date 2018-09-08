import { Reducer, Action } from "redux";
import {
  UPDATE_INPUT_VALUE,
  UpdateInputValueAction,
  ENTER_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  EnterInputValueAction,
} from "@app/actions/ui";

export interface InputState {
  value: string;
  dirtyValue: string;
  history: {
    values: string[];
    index: number;
  };
}

export const inputInitialState: InputState = {
  value: "",
  dirtyValue: "",
  history: { values: [], index: 0 },
};

const beginOfHistory = ({ history }: InputState) => history.index === 0;

const endOfHistory = ({ history }: InputState) =>
  history.index === history.values.length;

const handlers: {
  [action: string]: (input: InputState, action: Action) => InputState;
} = {
  [UPDATE_INPUT_VALUE]: (input, action: UpdateInputValueAction) => ({
    ...input,
    value: action.payload.value,
    dirtyValue: endOfHistory(input) ? action.payload.value : input.dirtyValue,
  }),

  [ENTER_INPUT_VALUE]: (input, action: EnterInputValueAction) => {
    const historyValues = [...input.history.values, action.payload.value];
    return {
      value: "",
      dirtyValue: "",
      history: { values: historyValues, index: historyValues.length },
    };
  },

  [GO_BACK_INPUT_HISTORY]: input =>
    beginOfHistory(input)
      ? input
      : {
          ...input,
          value: input.history.values[input.history.index - 1],
          history: { ...input.history, index: input.history.index - 1 },
        },

  [GO_FORWARD_INPUT_HISTORY]: input =>
    endOfHistory(input)
      ? input
      : {
          ...input,
          value:
            input.history.values[input.history.index + 1] || input.dirtyValue,
          history: { ...input.history, index: input.history.index + 1 },
        },
};

export const reduceInput: Reducer<InputState, Action> = (
  input = inputInitialState,
  action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](input, action)
    : input;
