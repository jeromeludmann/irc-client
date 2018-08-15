import { Middleware } from "redux";
import { CloseWindowAction, CLOSE_WINDOW } from "@app/actions/ui";
import { AppState } from "@app/reducers";
import { isChannel, isStatus } from "@app/Route";
import { disconnectServer } from "@app/actions/socket";
import { sendPart } from "@app/actions/messages";

/**
 * UI side-effects middleware
 *
 * Handle all UI actions with side-effects.
 */
export const ui: Middleware<{}, AppState> = _ => next => (
  action: CloseWindowAction,
) => {
  next(action);

  if (action.type === CLOSE_WINDOW) {
    if (isChannel(action.route.channelKey)) {
      next(sendPart(action.route.serverKey, action.route.channelKey));
    } else if (isStatus(action.route.channelKey)) {
      next(disconnectServer(action.route.serverKey));
    }
  }
};
