import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss"

// import AdminLayout from "./layouts/Admin.jsx";
// import AuthLayout from "./layouts/Auth.jsx";

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from "history"
import AppRouter from './Helpers/AppRouter'
const rootElement = document.getElementById("root")
// Router
const history = createBrowserHistory()

ReactDOM.render(
  <BrowserRouter history={history}>
    <AppRouter/>
  </BrowserRouter>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();