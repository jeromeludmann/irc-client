export type ValueState = string;

type ValueAction =
  | { type: "INPUT_CHANGED"; payload: { value: string } }
  | { type: "INPUT_SENT"; payload: {} };

const initialState: ValueState = "";

export default function(state = initialState, action: ValueAction): ValueState {
  switch (action.type) {
    case "INPUT_CHANGED":
      return action.payload.value;
    case "INPUT_SENT":
      return "";
    default:
      return state;
  }
}
