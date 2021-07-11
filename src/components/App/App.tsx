import React, { FC, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import style from './App.module.scss'
import { AppHeader } from '../AppHeader'
import { BurgerUnion } from '../../pages/BurgerUnion'
import { ROUTES } from '../../utils/routes/routes'
import { Login } from '../../pages/Login'
import { Register } from '../../pages/Register'
import { ForgotPassword } from '../../pages/ForgotPassword'
import { ResetPassword } from '../../pages/ResetPassword'
import { Profile } from '../../pages/Profile'
import { Feed } from '../../pages/Feed'
import { OrderHistoryDetailCard } from '../../pages/OrderHistoryDetailCard'
import { ProtectedRoute } from '../ProtectedRoute'
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import { getRefreshToken } from '../../utils/functions/tokens'
import { getIsEmailSent } from '../../services/ducks/auth/selectors'
import { IngredientModal } from '../../pages/IngredientModal'
import { Modal } from '../Modal'
import { OrderDetails } from '../OrderDetails'
import { loadIngredients } from '../../services/ducks/constructor'

type TLocationItem = {
  hash: string
  key: string
  pathname: string
  search: string
  state: null
}
type TLocation = {
  hash: string
  key: string
  pathname: string
  search: string
  state: { background: TLocationItem } | null
  background: TLocationItem
}

export const App: FC = () => {
  const hasToken = !!getRefreshToken()
  const emailWasSent = useSelector(getIsEmailSent)
  const history = useHistory()
  const location = useLocation<TLocation>()

  const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch])

  return (
    <div className={style.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path={ROUTES.MAIN} exact>
          <BurgerUnion />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          {hasToken && <Redirect to={ROUTES.MAIN} />}
          <Login />
        </Route>
        <Route path={ROUTES.REGISTER} exact>
          {hasToken && <Redirect to={ROUTES.MAIN} />}
          <Register />
        </Route>
        <Route path={ROUTES.FORGOT_PASSWORD} exact>
          {hasToken && <Redirect to={ROUTES.MAIN} />}
          <ForgotPassword />
        </Route>
        <Route path={ROUTES.RESET_PASSWORD} exact>
          {!hasToken && !emailWasSent && <Redirect to={`${ROUTES.FORGOT_PASSWORD}`} />}
          {hasToken && <Redirect to={`${ROUTES.MAIN}`} />}
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
        <Route path={`${ROUTES.INGREDIENTS}/:id`}>
          <IngredientModal fullScreen={false} />
        </Route>
        <Route>
          <div>
            <h1> 404 Здесь ничего нет</h1>
          </div>
        </Route>
      </Switch>
      {background && (
        <>
          <Route path={`${ROUTES.INGREDIENTS}/:id`}>
            <Modal>
              <IngredientModal fullScreen={true} />
            </Modal>
          </Route>
          <ProtectedRoute path={`${ROUTES.PROFILE_ORDERS}/:id`}>
            <Modal>
              <OrderHistoryDetailCard />
            </Modal>
          </ProtectedRoute>
          <Route path={`${ROUTES.FEED}/:id`}>
            <Modal>
              <OrderHistoryDetailCard />
            </Modal>
          </Route>

          <ProtectedRoute path={`${ROUTES.ORDER}`}>
            <Modal>
              <OrderDetails />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </div>
  )
}
App.displayName = 'App'
