import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute'
import AdminLayout from "../layouts/Admin.jsx";
import AuthLayout from "../layouts/Auth.jsx";

function AppRouter() {
    return (
        <Switch>
            <Redirect from="/" to="/auth/login" />
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <PrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
        </Switch>
    )
}

export default AppRouter;