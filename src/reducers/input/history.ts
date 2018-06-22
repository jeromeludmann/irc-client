import {
  GoBackInputHistoryAction,
  GoForwardInputHistoryAction,
  EnterInputValueAction,
  ENTER_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
} from "@app/actions/input";
import { beginOfHistory, endOfHistory } from "@app/reducers/input/_helpers";

export interface HistoryState {
  readonly values: string[];
  readonly index: number;
}

export type HistoryAction =
  | EnterInputValueAction
  | GoBackInputHistoryAction
  | GoForwardInputHistoryAction;

export const historyInitialState: HistoryState = {
  values: [],
  index: 0,
};

export default (
  history = historyInitialState,
  action: HistoryAction,
): HistoryState => {
  switch (action.type) {
    case ENTER_INPUT_VALUE: {
      const values = [...history.values, action.payload.value];
      const index = values.length;
      return { values, index };
    }

    case GO_BACK_INPUT_HISTORY: {
      if (beginOfHistory(history)) {
        return history;
      }
      const index = history.index - 1;
      return { ...history, index };
    }

    case GO_FORWARD_INPUT_HISTORY: {
      if (endOfHistory(history)) {
        return history;
      }
      const index = history.index + 1;
      return { ...history, index };
    }

    default:
      return history;
  }
};
