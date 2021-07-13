import { FC, useEffect } from 'react'
import { refreshToken } from '../../services/ducks/auth'
import { getIsTokenUpdated, getIsTokenUpdating, getTokenUpdateDate } from '../../services/ducks/auth/selectors'
import { Redirect, Route } from 'react-router-dom'
import { getRefreshToken } from '../../utils/functions/tokens'
import { ROUTES } from '../../utils/routes/routes'
import { Loader } from '../Loader'
import { RouteProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch()
  const isTokenUpdated = useAppSelector(getIsTokenUpdated)
  const tokenUpdateDate = useAppSelector(getTokenUpdateDate)
  const tokenUpdating = useAppSelector(getIsTokenUpdating)
  const hasToken = !!getRefreshToken()

  useEffect(() => {
    console.log(hasToken && !isTokenUpdated && !tokenUpdating, 'tokenProtect')
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
