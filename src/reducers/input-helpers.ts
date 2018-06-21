import { HistoryState } from "@app/reducers/input-history";

export const beginOfHistory = (history: HistoryState) => history.index === 0;

export const endOfHistory = (history: HistoryState) =>
  history.index === history.values.length;
