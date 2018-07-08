import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "@app/store";
import Layout from "@app/components/layout";
import { injectGlobal } from "styled-components";

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root"),
);

// tslint:disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Menlo, Monaco, Courier;
    font-size: 12px;
  }
`;
