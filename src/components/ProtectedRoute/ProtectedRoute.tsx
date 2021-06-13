import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../../services/ducks/auth';
import {
  getIsTokenUpdated,
  getTokenUpdateDate,
} from '../../services/ducks/auth/selectors';
import { Redirect, Route } from 'react-router-dom';
import { getRefreshToken } from '../../utils/functions/tokens';
import { ROUTES } from '../../utils/routes/routes';
import { Loader } from '../Loader';

export const ProtectedRoute = ({ children, ...rest }: any) => {
  const dispatch = useDispatch();
  const isTokenUpdated = useSelector(getIsTokenUpdated);
  const tokenUpdateDate = useSelector(getTokenUpdateDate);
  const hasToken = !!getRefreshToken();
  console.log('isTokenUpdated', isTokenUpdated);
  console.log('hasToken', hasToken);

  useEffect(() => {
    if (hasToken && !isTokenUpdated) {
      dispatch(refreshToken(null));
    }
  }, [dispatch, hasToken, isTokenUpdated]);

  if (hasToken && !isTokenUpdated) {
    return Loader();
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
  );
};
