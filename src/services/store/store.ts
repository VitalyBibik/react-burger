import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../ducks/sockets/middleware';
import { socketAllOrders, wsActions } from '../ducks/sockets/slice';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    ...rootReducer,
    router: connectRouter(history),
  },
  middleware: [
    thunk,
    routerMiddleware(history),
    socketMiddleware(socketAllOrders, wsActions, false),
  ],
});
