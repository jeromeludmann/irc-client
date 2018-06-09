import * as Actions from "@app/actions/input";
import { SideEffectReturn } from "@app/effects/SideEffect";

export function updateValue(value: string): SideEffectReturn {
  return dispatch => {
    dispatch(Actions.changeInputValue(value));
  };
}

export function sendValue(value: string): SideEffectReturn {
  return dispatch => {
    // TODO send to socket
    dispatch(Actions.sendInputValue(value));
  };
}

export function goBackHistory(): SideEffectReturn {
  return dispatch => {
    dispatch(Actions.goBackHistory());
  };
}

export function goForwardHistory(): SideEffectReturn {
  return dispatch => {
    dispatch(Actions.goForwardHistory());
  };
}
