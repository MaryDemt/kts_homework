import React from "react";

import { configure } from "mobx";
import ReactDOM from "react-dom/client";

import App from "./App";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
