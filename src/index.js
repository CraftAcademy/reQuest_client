import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./state/store/configureStore";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_HEROKUURL;
} else if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_LOCALURL;
}
const store = configureStore();
window.store = store
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
