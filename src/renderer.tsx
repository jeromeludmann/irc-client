import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "@app/store";
import Container from "@app/components/Container";

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById("root"),
);
