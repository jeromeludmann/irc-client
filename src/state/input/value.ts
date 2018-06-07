import {
  ChangedAction,
  SentAction,
  INPUT_CHANGED,
  INPUT_SENT,
} from "@app/input/types";

export type ValueState = string;

export default function(
  value: ValueState = "",
  { type, payload }: ChangedAction | SentAction,
): ValueState {
  switch (type) {
    case INPUT_CHANGED:
      return payload.value;
    case INPUT_SENT:
      return "";
    default:
      return value;
  }
}
