import { Action } from "redux";
import messages, {
  MessageListState,
  MessageListAction,
  messagesInitialState,
} from "@app/reducers/buffer-messages";
import input, {
  InputState,
  InputAction,
  inputInitialState,
} from "@app/reducers/input";
import unread, {
  UnreadState,
  UnreadAction,
  unreadInitialState,
} from "@app/reducers/buffer-unread";
import { WindowState } from "@app/reducers/window";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

export interface BufferState {
  readonly messages: MessageListState;
  readonly input: InputState;
  readonly unread: UnreadState;
}

export type BufferAction = Action;

interface ExtraParams {
  user: UserState;
  active: WindowState;
  route: Route;
}

export const bufferInitialState: BufferState = {
  messages: messagesInitialState,
  input: inputInitialState,
  unread: unreadInitialState,
};

export default (
  buffer = bufferInitialState,
  action: BufferAction,
  params: ExtraParams,
): BufferState => ({
  messages: messages(buffer.messages, action as MessageListAction),
  input: input(buffer.input, action as InputAction),
  unread: unread(buffer.unread, action as UnreadAction, params),
});
