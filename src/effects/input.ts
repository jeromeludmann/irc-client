import { Dispatch } from "redux";
import {
  inputValueChanged,
  inputValueSent,
  updateInputHistory,
} from "@app/actions/input";
import { RootState } from "@app/state";
import { selectInput, selectActiveRoute } from "@app/state/selectors";
import { selectHistory } from "@app/state/input/selectors";

export const updateValue = (value: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  dispatch(inputValueChanged(selectActiveRoute(getState()), value));
};

export const sendValue = (value: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  // TODO send to socket
  dispatch(inputValueSent(selectActiveRoute(getState()), value));
};

export const goBackHistory = () => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const history = selectHistory(getState());

  if (history.index === 0) {
    return;
  }

  const index = history.index - 1;
  const value = history.values[index];

  dispatch(updateInputHistory(selectActiveRoute(getState()), value, index));
};

export const goForwardHistory = () => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const { dirtyValue, history } = selectInput(getState());

  if (history.index === history.values.length) {
    return;
  }

  const index = history.index + 1;
  const value = history.values[index] || dirtyValue;

  dispatch(updateInputHistory(selectActiveRoute(getState()), value, index));
};
