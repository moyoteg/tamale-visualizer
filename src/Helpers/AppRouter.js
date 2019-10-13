import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute'
import AdminLayout from "../layouts/Admin.jsx";
import AuthLayout from "../layouts/Auth.jsx";

const AppRouter = () => (
    <Switch>
        <PrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
    </Switch>
)

export default AppRouter;