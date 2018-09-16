import { Action, Reducer } from 'redux'

export interface CaseReducerMap<R> {
  [action: string]: R
}
