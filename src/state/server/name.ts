export type NameState = string;

type NameAction = {
  type: "SET_NAME";
  payload: { name: string };
};

const initialState: NameState = "";

export default function(name = initialState, action: NameAction): NameState {
  switch (action.type) {
    case "SET_NAME":
      return action.payload.name;
    default:
      return name;
  }
}
