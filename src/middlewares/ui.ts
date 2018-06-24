import { Middleware } from "redux";
import { CloseWindowAction, CLOSE_WINDOW } from "@app/actions/ui";
import { AppState } from "@app/reducers";
import { isChannel, isStatus } from "@app/Route";
import { sendMessage, disconnectServer } from "@app/actions/socket";

export const ui: Middleware<{}, AppState> = _ => next => (
  action: CloseWindowAction,
) => {
  next(action);

  if (action.type === CLOSE_WINDOW) {
    if (isChannel(action.route.channelKey)) {
      next(
        sendMessage(action.route.serverKey, "part", action.route.channelKey),
      );
    } else if (isStatus(action.route.channelKey)) {
      next(disconnectServer(action.route.serverKey));
    }
  }
};
