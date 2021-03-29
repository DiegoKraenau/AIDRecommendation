import React from 'react'
import { Redirect, Route } from 'react-router-dom'



export default function ProtectedRoutes({component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            if (localStorage.getItem('token')) {
                return <Component></Component>
            } else {
                return (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                );
            }
        }}>
        </Route>
    )
}
