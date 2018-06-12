import { createStore, applyMiddleware } from "redux";
import rootReducer from "@app/state";
import mockedState from "@app/mockedState";
import inputHandler from "@app/middlewares/inputHandler";
import messageSender from "@app/middlewares/messageHandler";

export const store = createStore(
  rootReducer,
  mockedState,
  applyMiddleware(inputHandler, messageSender),
);
