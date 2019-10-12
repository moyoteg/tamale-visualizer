import React, {
} from 'react'
import {
    Route,
    Redirect
} from "react-router-dom";
import PublicHomePage from './PublicHomePage'
import CartsViewer from '../views/CartsViewer'
import ProvidersViewer from './ProvidersViewer'

export default function MainView() {

    const [loggedIn, setLoggedIn] = React.useState(false)

    return (
        <div>
            <Route exact path="/">
                {loggedIn ? <Redirect to="/providers" /> : <PublicHomePage />}
            </Route>
            <Route path="/carts">
                <CartsViewer />
            </Route>
            <Route path="/providers">
                <ProvidersViewer />
            </Route>
        </div>
    );
}