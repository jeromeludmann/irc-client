import { createStore } from "redux";
import rootReducer from "@app/state";
import mockedState from "@app/mockedState";

export const store = createStore(rootReducer, mockedState);
