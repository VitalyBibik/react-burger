import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from '../../services/ducks/auth'
import { getIsTokenUpdated, getIsTokenUpdating, getTokenUpdateDate } from '../../services/ducks/auth/selectors'
import { Redirect, Route } from 'react-router-dom'
import { getRefreshToken } from '../../utils/functions/tokens'
import { ROUTES } from '../../utils/routes/routes'
import { Loader } from '../Loader'
import { RouteProps } from 'react-router-dom'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch()
  const isTokenUpdated = useSelector(getIsTokenUpdated)
  const tokenUpdateDate = useSelector(getTokenUpdateDate)
  const tokenUpdating = useSelector(getIsTokenUpdating)
  const hasToken = !!getRefreshToken()

  useEffect(() => {
    if (hasToken && !isTokenUpdated && !tokenUpdating) {
      dispatch(refreshToken(null))
    }
  }, [dispatch, hasToken, isTokenUpdated, tokenUpdating])

  if (hasToken && !isTokenUpdated) {
    return <Loader />
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasToken && tokenUpdateDate ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${ROUTES.LOGIN}`,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
