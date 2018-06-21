import { createSelector } from "reselect";
import { selectInput } from "@app/reducers/buffer-selectors";

export const selectValue = createSelector(selectInput, input => input.value);
