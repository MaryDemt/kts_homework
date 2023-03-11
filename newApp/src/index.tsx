import React from "react";

import ReactDOM from "react-dom/client";
import "regenerator-runtime";
// eslint-disable-next-line
import { configure } from "mobx";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
