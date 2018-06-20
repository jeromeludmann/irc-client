import { createSelector } from "reselect";
import { selectInput } from "@app/reducers/window/selectors";

export const selectValue = createSelector(selectInput, input => input.value);
