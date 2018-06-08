import {
  InputValueChanged,
  InputValueSent,
  INPUT_VALUE_CHANGED,
  INPUT_VALUE_SENT,
  INPUT_HISTORY_SET,
  SetInputHistory,
} from "@app/actions/input";

export interface InputState {
  readonly value: string;
  readonly lastValue: string;
  readonly history: string[];
  readonly historyIndex: number;
}

type CatchableAction = InputValueChanged | InputValueSent | SetInputHistory;

const initialState = {
  value: "",
  lastValue: "",
  history: [],
  historyIndex: 0,
};

export default function reduce(
  input: InputState = initialState,
  action: CatchableAction,
): InputState {
  switch (action.type) {
    case INPUT_VALUE_CHANGED: {
      const value = action.payload.value;

      return {
        ...input,
        value,
        lastValue: value,
      };
    }

    case INPUT_VALUE_SENT: {
      const history = [...input.history, input.value];
      const historyIndex = history.length;
      return { ...input, value: "", lastValue: "", history, historyIndex };
    }

    case INPUT_HISTORY_SET: {
      const { value, historyIndex } = action.payload;
      return { ...input, value, historyIndex };
    }

    default:
      return input;
  }
}
