import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import style from './App.module.scss';
import { AppHeader } from '../AppHeader';
import { BurgerUnion } from '../BurgerUnion';
import { ROUTES } from "../../constants/routes";
import { Login } from '../Login'
import { Register } from "../Register";
import { ForgotPassword } from "../ForgotPassword";

export function App() {
  return (
    <div className={style.App}>
        <AppHeader />
        <Router>
            <Switch>
                <Route path={ROUTES.MAIN} exact={true}>
                    <BurgerUnion />
                </Route>
                <Route path={ROUTES.LOGIN}>
                    <Login />
                </Route>
                <Route path={ROUTES.REGISTER}>
                    <Register />
                </Route>
                <Route path={ROUTES.FORGOT_PASSWORD}>
                    <ForgotPassword />
                </Route>
            </Switch>
        </Router>

    </div>
  );
}
