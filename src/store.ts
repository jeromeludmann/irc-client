import { createStore, applyMiddleware } from "redux";
import { sideEffects } from "@app/se";
import rootReducer from "@app/state";

export const store = createStore(
  rootReducer,
  {
    active: {
      server: "serverKey",
      channel: "status",
    },
  },
  applyMiddleware(...sideEffects),
);
