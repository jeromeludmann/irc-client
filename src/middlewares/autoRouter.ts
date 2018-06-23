import { Middleware } from "redux";
import { selectRoute } from "@app/reducers/_selectors";

export const autoRouter: Middleware = store => next => action => {
  if (!action.hasOwnProperty("route")) {
    action.route = selectRoute(store.getState());
  }

  next(action);
};
