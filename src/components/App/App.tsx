import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import style from './App.module.scss';
import { AppHeader } from '../AppHeader';
import { BurgerUnion } from '../../pages/BurgerUnion';
import { ROUTES } from "../../constants/routes";
import { Login } from '../../pages/Login'
import { Register } from "../../pages/Register";
import { ForgotPassword } from "../../pages/ForgotPassword";
import { ResetPassword } from "../../pages/ResetPassword";
import { Profile } from "../../pages/Profile";
import { Feed } from "../../pages/Feed";
import { OrderHistoryDetailCard } from '../OrderHistoryDetailCard'

export function App() {
    return (
        <div className={style.App}>
            <Router>
                <AppHeader/>
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
                    <Route path={ROUTES.RESET_PASSWORD}>
                        <ResetPassword />
                    </Route>
                    <Route path={ROUTES.PROFILE}>
                        <Profile />
                    </Route>
                    <Route path={ROUTES.FEED} exact>
                        <Feed />
                    </Route>
                    <Route path={`${ROUTES.FEED}/:id`} exact>
                        <OrderHistoryDetailCard />
                    </Route>
                </Switch>
            </Router>

        </div>
    );
}
