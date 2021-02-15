import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById("root")
);
reportWebVitals();
