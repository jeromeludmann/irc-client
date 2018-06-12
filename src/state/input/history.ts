import {
  INPUT_HISTORY_BACK,
  INPUT_HISTORY_FORWARD,
  GoBackInputHistory,
  GoForwardInputHistory,
} from "@app/actions/input";
import { beginOfHistory, endOfHistory } from "@app/state/input/helpers";
import { SEND_COMMAND, SendCommand } from "@app/actions/irc";

export interface HistoryState {
  readonly values: string[];
  readonly index: number;
}

export type HistoryAction =
  | SendCommand
  | GoBackInputHistory
  | GoForwardInputHistory;

export default function reduceHistory(
  history: HistoryState,
  action: HistoryAction,
): HistoryState {
  switch (action.type) {
    case SEND_COMMAND: {
      const values = [...history.values, action.payload.value];
      const index = values.length;
      return { values, index };
    }

    case INPUT_HISTORY_BACK: {
      if (beginOfHistory(history)) {
        return history;
      }
      const index = history.index - 1;
      return { ...history, index };
    }

    case INPUT_HISTORY_FORWARD: {
      if (endOfHistory(history)) {
        return history;
      }
      const index = history.index + 1;
      return { ...history, index };
    }

    default:
      return history;
  }
}
