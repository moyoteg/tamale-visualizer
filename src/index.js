import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import "./assets/scss/argon-dashboard-react.scss";
import "./assets/scss/argon-dashboard-react.scss"

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  withRouter,
  Router,
} from "react-router-dom"
import { createBrowserHistory } from "history"
import FirebaseAuthProvider from './Helpers/AuthProvider/FirebaseAuthProvider'
import withFirebaseAuth from 'react-with-firebase-auth'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/register" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// const rootElement = document.getElementById("root")
// // Router
// const history = createBrowserHistory()
// const RoutedApp = withRouter(App)
// // firebase auth
// const providers = FirebaseAuthProvider.firebaseConfig
// const firebaseAppAuth = FirebaseAuthProvider.firebaseAuth
// const AuthedApp = withFirebaseAuth({ providers, firebaseAppAuth })(RoutedApp)

// ReactDOM.render(
//   <Router history={history}>
//     <AuthedApp />
//   </Router>,
//   rootElement
// )

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();