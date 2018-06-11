import { HistoryState } from "@app/state/input/history";

export function beginOfHistory(history: HistoryState) {
  return history.index === 0;
}

export function endOfHistory(history: HistoryState) {
  return history.index === history.values.length;
}
