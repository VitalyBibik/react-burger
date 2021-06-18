import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    ...rootReducer,
    router: connectRouter(history),
  },
  middleware: [thunk, routerMiddleware(history)],
});
