import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "@app/state";
import mockedState from "@app/mockedState";

export const store = createStore(
  rootReducer,
  mockedState,
  applyMiddleware(thunk),
);
