import { createStore } from "redux";
import { rootReducer } from "@app/reducers/rootReducer";

export const store = createStore(rootReducer, {
  servers: {},
});
