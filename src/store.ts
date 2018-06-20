import { createStore, applyMiddleware } from "redux";
import { sideEffects } from "@app/middlewares";
import rootReducer from "@app/reducers";
import { STATUS_WINDOW } from "@app/Route";

export const store = createStore(
  rootReducer,
  {
    user: { nick: "nick", user: "user", real: "IRC Client" },
    active: { server: "serverKey", window: STATUS_WINDOW },
  },
  applyMiddleware(...sideEffects),
);
