import React from 'react';
import { Switch, Route } from 'react-router-dom';
import style from './App.module.scss';
import { AppHeader } from '../AppHeader';
import { BurgerUnion } from '../../pages/BurgerUnion';
import { ROUTES } from '../../utils/routes/routes';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword';
import { Profile } from '../../pages/Profile';
import { Feed } from '../../pages/Feed';
import { OrderHistoryDetailCard } from '../../pages/OrderHistoryDetailCard';
import { ProtectedRoute } from '../ProtectedRoute';

export function App() {
  return (
    <div className={style.App}>
      <AppHeader />
      <Switch>
        <Route path={ROUTES.MAIN} exact>
          <BurgerUnion />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          <Login />
        </Route>
        <Route path={ROUTES.REGISTER} exact>
          <Register />
        </Route>
        <Route path={ROUTES.FORGOT_PASSWORD} exact>
          <ForgotPassword />
        </Route>
        <Route path={ROUTES.RESET_PASSWORD} exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path={ROUTES.PROFILE} exact={false}>
          <Profile />
        </ProtectedRoute>
        <Route path={ROUTES.FEED} exact>
          <Feed />
        </Route>
        <Route path={`${ROUTES.FEED}/:id`} exact>
          <OrderHistoryDetailCard />
        </Route>
        <Route>
          <div>
            <h1> 404 Здесь ничего нет</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
