import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from '@app/reducers/messages'
import { InputState, inputInitialState, reduceInput } from '@app/reducers/input'
import { RoutedAction } from '@app/utils/Route'
import { RouteState } from '@app/reducers/route'
import { RECEIVE_JOIN, ReceiveJoinAction } from '@app/actions/msgIncoming'
import { SWITCH_WINDOW } from '@app/actions/ui'
import { ServerState } from '@app/reducers/server'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'
import { AnyAction } from 'redux'

type BufferPartialState = Readonly<{
  activity: boolean
}>

export type BufferState = Readonly<{
  input: InputState
  messages: MessagesState
}> &
  BufferPartialState

type BufferReducer<S = BufferState> = (
  buffer: S,
  action: RoutedAction,
  extraStates: {
    route: RouteState
    server: ServerState
  },
) => S

export const bufferInitialState = {
  activity: false,
  input: inputInitialState,
  messages: messagesInitialState,
}

const itIsMe = (action: AnyAction, extraStates: { server: ServerState }) =>
  action.payload.user.nick === extraStates.server.user.nick

const caseReducers: CaseReducerMap<BufferReducer<BufferPartialState>> = {
  [RECEIVE_JOIN]: (_, action: ReceiveJoinAction, extraStates) => ({
    activity: !itIsMe(action, extraStates),
  }),

  [SWITCH_WINDOW]: () => ({ activity: false }),
}

export const reduceBuffer: BufferReducer = (
  buffer,
  action,
  extraStates,
): BufferState => ({
  ...(action.type in caseReducers
    ? caseReducers[action.type](buffer, action, extraStates)
    : buffer),
  input: reduceInput(buffer.input, action),
  messages: reduceMessages(buffer.messages, action, extraStates),
})
