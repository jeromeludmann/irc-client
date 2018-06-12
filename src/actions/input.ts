export const INPUT_VALUE_CHANGE = "INPUT/VALUE/CHANGE";
export const INPUT_HISTORY_UPDATE = "INPUT/HISTORY/UPDATE";
export const INPUT_HISTORY_BACK = "INPUT/HISTORY/BACK";
export const INPUT_HISTORY_FORWARD = "INPUT/HISTORY/FORWARD";

export interface ChangeInputValue {
  type: typeof INPUT_VALUE_CHANGE;
  payload: { value: string };
}

export interface GoBackInputHistory {
  type: typeof INPUT_HISTORY_BACK;
}

export interface GoForwardInputHistory {
  type: typeof INPUT_HISTORY_FORWARD;
}

export function changeInputValue(value: string): ChangeInputValue {
  return {
    type: INPUT_VALUE_CHANGE,
    payload: { value },
  };
}

export function goBackHistory(): GoBackInputHistory {
  return {
    type: INPUT_HISTORY_BACK,
  };
}

export function goForwardHistory(): GoForwardInputHistory {
  return {
    type: INPUT_HISTORY_FORWARD,
  };
}
