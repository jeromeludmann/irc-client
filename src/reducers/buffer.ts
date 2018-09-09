import {
  MessagesState,
  messagesInitialState,
  reduceMessages,
} from '@app/reducers/messages'
import { InputState, inputInitialState, reduceInput } from '@app/reducers/input'
import { RoutedAction } from '@app/Route'
import { RouteState } from '@app/reducers/route'
import { RECEIVE_JOIN, ReceiveJoinAction } from '@app/actions/msgIncoming'
import { SWITCH_WINDOW } from '@app/actions/ui'
import { ServerState } from '@app/reducers/server'

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

const handlers: { [action: string]: BufferReducer<BufferPartialState> } = {
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
  ...(handlers.hasOwnProperty(action.type)
    ? handlers[action.type](buffer, action, extraStates)
    : buffer),
  input: reduceInput(buffer.input, action),
  messages: reduceMessages(buffer.messages, action, extraStates),
})
