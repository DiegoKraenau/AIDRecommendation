import React from 'react'
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";

export default function ProtectedRoutes({ isAuth, component: Component, ...rest }) {
    let history = useHistory();
    return (
        <Route {...rest} render={(props) => {
            if (isAuth) {
                return <Component></Component>
            } else {
                history.push('/')

            }
        }}>
        </Route>
    )
}
