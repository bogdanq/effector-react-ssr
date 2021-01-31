import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { root } from "effector-root";
import { hydrate, fork } from "effector/fork";

import { App } from "./App";

hydrate(root, { values: INITIAL_STATE });

const scope = fork(root);

ReactDom.hydrate(
  <BrowserRouter>
    <App root={scope} />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
