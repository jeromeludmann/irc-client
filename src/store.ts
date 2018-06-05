import { createStore } from "redux";
import rootReducer from "@app/state";

export const store = createStore(rootReducer, {
  servers: {},
});
