import { Middleware } from "redux";
import { selectRoute } from "@app/reducers/_selectors";
import { AppState } from "@app/reducers";

/**
 * Action Auto Router Middleware
 *
 * Add a route on an action if it does not have one yet.
 * Useful to ensure that an action will always be routed in the reducers.
 */
export const autoRouter: Middleware<{}, AppState> = ({
  getState,
}) => next => action => {
  if (!action.hasOwnProperty("route")) {
    action.route = selectRoute(getState());
  }

  next(action);
};
