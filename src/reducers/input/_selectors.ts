import { createSelector } from "reselect";
import { selectInput } from "@app/reducers/channel/_selectors";

export const selectValue = createSelector(selectInput, input => input.value);
