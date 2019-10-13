import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import FirebaseAuthProvider from '../Helpers/AuthProvider/FirebaseAuthProvider'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            FirebaseAuthProvider.Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/register"
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute 