import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { Loader } from '../Loader';
import { useSelector } from "react-redux";

import { getIsAuth, getIsAuthChecking } from "../../services/ducks/auth/selectors";

type ProtectedRouteProps = {
    path: string;
    children: React.ReactNode;
    exact: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({path, children, exact}) => {
    const isLoggedIn = useSelector(getIsAuth);
    const isChecking = useSelector(getIsAuthChecking);

    return (
        <Route path={path} exact={exact}>
            { isChecking ? (
                    <Loader />
            ) : (
                isLoggedIn ? children : <Redirect to="/profile" />
            )}
        </Route>
    )}

export default ProtectedRoute;
