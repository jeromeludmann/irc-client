import { createSelector } from 'reselect'
import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from '@app/reducers/messages'
import { InputState, inputInitialState, reduceInput } from '@app/reducers/input'
import { RoutedAction } from '@app/utils/Route'
import { RouteState, selectRoute } from '@app/reducers/route'
import { RECEIVE_JOIN, ReceiveJoinAction } from '@app/actions/msgIncoming'
import { SWITCH_WINDOW } from '@app/actions/ui'
import { ServerState, selectBuffers } from '@app/reducers/server'
import { CaseReducerMap } from '@app/utils/CaseReducerMap'

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

const caseReducers: CaseReducerMap<BufferReducer<BufferPartialState>> = {
  [RECEIVE_JOIN]: (_, action: ReceiveJoinAction, extraStates) => ({
    activity: action.payload.user.nick !== extraStates.server.user.nick,
  }),

  [SWITCH_WINDOW]: () => ({ activity: false }),
}

export const reduceBuffer: BufferReducer = (
  buffer = bufferInitialState,
  action,
  extraStates,
): BufferState => ({
  ...(action.type in caseReducers
    ? caseReducers[action.type](buffer, action, extraStates)
    : buffer),
  input: reduceInput(buffer.input, action),
  messages: reduceMessages(buffer.messages, action, extraStates),
})

export const selectBuffer = createSelector(
  selectBuffers,
  selectRoute,
  (buffers, route) => buffers[route.bufferKey],
)

export const selectActivity = createSelector(
  selectBuffer,
  buffer => buffer.activity,
)
