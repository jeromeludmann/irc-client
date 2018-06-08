import {
  InputValueChanged,
  InputValueSent,
  INPUT_VALUE_CHANGED,
  INPUT_VALUE_SENT,
  SetInputHistory,
} from "@app/actions/input";

export type DirtyValueState = string;

export const dirtyValueInitialState = "";

export default function reduceDirtyValue(
  value: DirtyValueState = dirtyValueInitialState,
  action: InputValueChanged | InputValueSent | SetInputHistory,
): DirtyValueState {
  switch (action.type) {
    case INPUT_VALUE_CHANGED:
      return action.payload.value;

    case INPUT_VALUE_SENT:
      return "";

    default:
      return value;
  }
}
