import { createSelector } from "reselect";
import { selectInput } from "@app/state/channel/selectors";

export const selectValue = createSelector(selectInput, input => input.value);
