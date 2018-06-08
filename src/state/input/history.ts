import {
  SetInputHistory,
  INPUT_HISTORY_UPDATE,
  INPUT_VALUE_SENT,
  InputValueSent,
} from "@app/actions/input";

export interface HistoryState {
  readonly values: string[];
  readonly index: number;
}

export const historyInitialState = { values: [], index: 0 };

export default function reduceHistory(
  history: HistoryState = historyInitialState,
  action: InputValueSent | SetInputHistory,
): HistoryState {
  switch (action.type) {
    case INPUT_VALUE_SENT: {
      const values = [...history.values, action.payload.value];
      const index = values.length;
      return { values, index };
    }

    case INPUT_HISTORY_UPDATE: {
      const { index } = action.payload;
      return { ...history, index };
    }

    default:
      return history;
  }
}
