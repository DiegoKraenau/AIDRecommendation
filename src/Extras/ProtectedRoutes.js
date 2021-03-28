import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Login from '../components/Login/Login';

export default function ProtectedRoutes({component: Component, ...rest }) {
    let history = useHistory();
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
