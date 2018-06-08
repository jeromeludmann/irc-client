import { Dispatch } from "redux";
import { ChannelRoute } from "@app/Route";
import {
  inputValueChanged,
  inputValueSent,
  setInputHistory,
} from "@app/actions/input";
import { RootState } from "@app/state";
import { selectInput } from "@app/state/selectors";

export const updateValue = (route: ChannelRoute, value: string) => (
  dispatch: Dispatch,
) => {
  dispatch(inputValueChanged(route, value));
};

export const sendValue = (route: ChannelRoute, value: string) => (
  dispatch: Dispatch,
) => {
  // TODO send to socket
  dispatch(inputValueSent(route, value));
};

export const goBackHistory = (route: ChannelRoute) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const { history, historyIndex } = selectInput(route, getState());
  if (historyIndex === 0) {
    return;
  }
  const updatedIndex = historyIndex - 1;
  const newValue = history[updatedIndex];
  dispatch(setInputHistory(route, newValue, updatedIndex));
};

export const goForwardHistory = (route: ChannelRoute) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const { lastValue, history, historyIndex } = selectInput(route, getState());
  if (historyIndex === history.length) {
    return;
  }
  const updatedIndex = historyIndex + 1;
  const newValue = history[updatedIndex] || lastValue;
  dispatch(setInputHistory(route, newValue, updatedIndex));
};
