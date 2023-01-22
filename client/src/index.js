import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; //Note: should work after rename AppWithStore to App
import AppWithStore from "./AppWithStore"; //TODO: remove AppWithStore
import reportWebVitals from "./reportWebVitals";
import { ProvideAuth } from "./context/AuthProvider";
import store from "./components/Store";
import { Provider } from "react-redux";
import "../node_modules/react-bootstrap/dist/react-bootstrap.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//TODO: remove ProvideAuth
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ProvideAuth>
        <App />
      </ProvideAuth> */}
      <AppWithStore />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
