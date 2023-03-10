import React from 'react';
import ReactDOM from "react-dom/client";
import 'regenerator-runtime';

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <div>React приложение</div>
  </React.StrictMode>
);

if(module.hot){
    module.hot.accept()
}