import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { getStore } from "@app/store";
import { App } from "@app/components/App";
import { generateServerKey } from "@app/middlewares/socketHandler";

render(
  <Provider store={getStore(generateServerKey())}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// tslint:disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Menlo, Monaco, Courier;
    font-size: 12px;
  }
`;
