import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@app/state";

export type SideEffectReturn = (
  dispatch: ThunkDispatch<RootState, void, Action<string>>,
  getState: () => RootState,
) => void;

// TODO
export type SideEffect<T1 = void, T2 = void, T3 = void> = (
  arg1?: T1,
  arg2?: T2,
  arg3?: T3,
) => SideEffectReturn;
