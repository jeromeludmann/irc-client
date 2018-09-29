import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from '@app/state/messages/reducer'
import {
  InputState,
  inputInitialState,
  reduceInput,
} from '@app/state/input/reducer'
import { RoutedAction } from '@app/utils/Route'
import { RouteState } from '@app/state/route/reducer'
import { RECEIVE_JOIN, ReceiveJoinAction } from '@app/actions/messages/incoming'
import { SWITCH_WINDOW } from '@app/actions/ui'
import { ServerState } from '@app/state/server/reducer'
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

const caseReducers: { [action: string]: BufferReducer<BufferPartialState> } = {
  [RECEIVE_JOIN]: (_, action: ReceiveJoinAction, extraStates) => ({
    activity: !itIsMe(action, extraStates),
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
