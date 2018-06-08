import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "@app/store";
import Layout from "@app/ui/Layout";

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root"),
);
