import {
  ChangeInputAction,
  SendInputAction,
  InputTypes,
} from "@app/state/input";

export type ValueState = string;

type Action = ChangeInputAction | SendInputAction;

const initialState: ValueState = "";

export default function(
  state = initialState,
  { type, payload }: Action,
): ValueState {
  switch (type) {
    case InputTypes.CHANGE:
      return payload.value;
    case InputTypes.SEND:
      return "";
    default:
      return state;
  }
}
