import { selectInput } from "@app/state/selectors";
import { createSelector } from "reselect";
import { InputState } from "@app/state/input/input";

export const selectValue = createSelector(
  selectInput,
  (input: InputState) => input.value,
);

export const selectHistory = createSelector(
  selectInput,
  (input: InputState) => input.history,
);
