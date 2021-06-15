import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { getRefreshToken } from '../../utils/functions/tokens';
import { getIsEmailSent } from '../../services/ducks/auth/selectors';
import { IngredientModal } from '../IngredientModal';
import { Modal } from '../Modal';
import { getProductsFetch } from '../../utils/api/api';
import { IngredientDetails } from '../IngredientsDetails';
type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
  order?: null;
};

export function App() {
  const hasToken = !!getRefreshToken();
  const emailWasSent = useSelector(getIsEmailSent);

  const history = useHistory();
  let location = useLocation();

  let background =
    (history.action === 'PUSH' || history.action === 'REPLACE') &&
      // @ts-ignore
    location.state && location.state.background;

  return (
    <div className={style.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path={ROUTES.MAIN} exact>
          <BurgerUnion />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          {hasToken && <Redirect to='/' />}
          <Login />
        </Route>
        <Route path={ROUTES.REGISTER} exact>
          {hasToken && <Redirect to='/' />}
          <Register />
        </Route>
        <Route path={ROUTES.FORGOT_PASSWORD} exact>
          {!hasToken && <Redirect to='/' />}
          <ForgotPassword />
        </Route>
        <Route path={ROUTES.RESET_PASSWORD} exact>
          {!hasToken && emailWasSent === false && (
            <Redirect to={`${ROUTES.FORGOT_PASSWORD}`} />
          )}
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
        <Route path={`/ingredients/:id`} children={<IngredientModal />} />
        <Route>
          <div>
            <h1> 404 Здесь ничего нет</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
