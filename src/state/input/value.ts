import {
  InputValueChanged,
  InputValueSent,
  INPUT_VALUE_CHANGED,
  INPUT_VALUE_SENT,
  INPUT_HISTORY_UPDATE,
  SetInputHistory,
} from "@app/actions/input";

export type ValueState = string;

export const valueInitialState = "";

export default function reduceValue(
  value: ValueState = valueInitialState,
  action: InputValueChanged | InputValueSent | SetInputHistory,
): ValueState {
  switch (action.type) {
    case INPUT_VALUE_CHANGED:
      return action.payload.value;

    case INPUT_VALUE_SENT:
      return "";

    case INPUT_HISTORY_UPDATE:
      return action.payload.value;

    default:
      return value;
  }
}
