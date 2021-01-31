import { Fork } from "effector";
import React from "react";
import { Provider } from "effector-react/ssr";

import { Home } from "./pages/home";

export const App = ({ root }: { root: Fork }) => {
  console.log(root);
  return (
    <Provider value={root}>
      <Home />
    </Provider>
  );
};
