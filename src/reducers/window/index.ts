import { Action } from "redux";
import messages, {
  MessageListState,
  MessageListAction,
  messagesInitialState,
} from "@app/reducers/window/messages";
import input, {
  InputState,
  InputAction,
  inputInitialState,
} from "@app/reducers/input";
import unread, {
  UnreadState,
  UnreadAction,
  unreadInitialState,
} from "@app/reducers/window/unread";
import { ActiveWindowState } from "@app/reducers/active";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

export interface WindowState {
  readonly messages: MessageListState;
  readonly input: InputState;
  readonly unread: UnreadState;
}

export type WindowAction = Action;

interface ExtraParams {
  user: UserState;
  active: ActiveWindowState;
  route: Route;
}

export const windowInitialState: WindowState = {
  messages: messagesInitialState,
  input: inputInitialState,
  unread: unreadInitialState,
};

export default (
  window = windowInitialState,
  action: WindowAction,
  params: ExtraParams,
): WindowState => ({
  messages: messages(window.messages, action as MessageListAction),
  input: input(window.input, action as InputAction),
  unread: unread(window.unread, action as UnreadAction, params),
});
