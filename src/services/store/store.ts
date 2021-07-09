import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { rootReducer } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from '../ducks/orders/middleware'
import { getSpecialUserOrders, socketAllOrders, wsActions, wsActionsAuth } from '../ducks/orders/slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const history = createBrowserHistory()

export const store = configureStore({
  reducer: {
    ...rootReducer,
    router: connectRouter(history),
  },
  middleware: [
    thunk,
    routerMiddleware(history),
    socketMiddleware(socketAllOrders, wsActions, false),
    socketMiddleware(getSpecialUserOrders, wsActionsAuth, true),
  ],
})
