import {
  InputChangedAction,
  InputSentAction,
  InputActionTypes,
} from "@app/actions/input";

export type ValueState = string;

export default function(
  value: ValueState = "",
  { type, payload }: InputChangedAction | InputSentAction,
): ValueState {
  switch (type) {
    case InputActionTypes.CHANGED:
      return payload.value;
    case InputActionTypes.SENT:
      return "";
    default:
      return value;
  }
}
