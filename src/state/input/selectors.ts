import { ChannelRoute } from "@app/Route";
import { RootState } from "@app/state";
import { selectInput } from "@app/state/selectors";

export function selectValue(route: ChannelRoute, state: RootState): string {
  return selectInput(route, state).value;
}

export function selectHistory(route: ChannelRoute, state: RootState) {
  return selectInput(route, state).history;
}
