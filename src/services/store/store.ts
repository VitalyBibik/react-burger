import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { rootReducer } from './rootReducer'
import { ActionCreator, AnyAction, configureStore, Dispatch } from '@reduxjs/toolkit'
import { socketMiddleware } from '../ducks/orders/middleware'
import { getSpecialUserOrders, socketAllOrders, wsActions, wsActionsAuth } from '../ducks/orders/slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, null, AnyAction>
export type AppThunk<ReturnType = void | Promise<Response>> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, AnyAction>>
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
