import { Action } from 'redux'
import {
  UPDATE_INPUT_VALUE,
  UpdateInputValueAction,
  ENTER_INPUT_VALUE,
  GO_BACK_INPUT_HISTORY,
  GO_FORWARD_INPUT_HISTORY,
  EnterInputValueAction,
} from '@app/actions/ui'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'

export type InputState = Readonly<{
  value: string
  dirtyValue: string
  history: Readonly<{
    values: string[]
    index: number
  }>
}>

type InputReducer = (input: InputState, action: Action) => InputState

export const inputInitialState: InputState = {
  value: '',
  dirtyValue: '',
  history: { values: [], index: 0 },
}

const beginOfHistory = (input: InputState) => {
  return input.history.index === 0
}

const endOfHistory = (input: InputState) => {
  return input.history.index === input.history.values.length
}

const caseReducers: CaseReducerMap<InputReducer> = {
  [ENTER_INPUT_VALUE]: (input, action: EnterInputValueAction) => {
    const historyValues = [...input.history.values, action.payload.value]
    return {
      value: '',
      dirtyValue: '',
      history: { values: historyValues, index: historyValues.length },
    }
  },

  [GO_BACK_INPUT_HISTORY]: input =>
    beginOfHistory(input)
      ? input
      : {
          ...input,
          value: input.history.values[input.history.index - 1],
          history: { ...input.history, index: input.history.index - 1 },
        },

  [GO_FORWARD_INPUT_HISTORY]: input =>
    endOfHistory(input)
      ? input
      : {
          ...input,
          value:
            input.history.values[input.history.index + 1] || input.dirtyValue,
          history: { ...input.history, index: input.history.index + 1 },
        },

  [UPDATE_INPUT_VALUE]: (input, action: UpdateInputValueAction) => ({
    ...input,
    value: action.payload.value,
    dirtyValue: endOfHistory(input) ? action.payload.value : input.dirtyValue,
  }),
}

export const reduceInput: InputReducer = (input, action) =>
  action.type in caseReducers ? caseReducers[action.type](input, action) : input
