import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "@app/store";
import ConnectedServerList from "@app/ui/tmp/ConnectedServerList";

render(
  <Provider store={store}>
    <ConnectedServerList />
  </Provider>,
  document.getElementById("root"),
);
