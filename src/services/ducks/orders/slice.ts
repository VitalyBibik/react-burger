import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'
import { WS_AUTH_INIT, WS_INIT, WS_SEND_AUTH_MESSAGE, WS_SEND_MESSAGE } from './constants'

type TcurrentCard = {
  _id: string
  ingredients: Array<string>
  status: string
  name: string
  createdAt: string
  updatedAt: string
  number: number
}
export type Sockets = {
  wsConnected: boolean
  wsConnectedAuth: boolean
  orders: Array<TcurrentCard>
  ordersAuth: Array<TcurrentCard>
  total: number | null
  totalToday: number | null
}
const initialState: Sockets = {
  wsConnected: false,
  orders: [],
  ordersAuth: [],
  total: null,
  totalToday: null,
  wsConnectedAuth: false,
}

export const sliceName = 'ordersReducer'

export const socketAllOrders = 'wss://norma.nomoreparties.space/orders/all'
export const getSpecialUserOrders = `wss://norma.nomoreparties.space/orders`

export const wsInit = createAction<void>(WS_INIT)
export const wsAuthInit = createAction<void>(WS_AUTH_INIT)
export const wsSendMessage = createAction<string>(WS_SEND_MESSAGE)
export const wsSendAuthMessage = createAction<string>(WS_SEND_AUTH_MESSAGE)

type TMessage = {
  total: number
  totalToday: number
  orders: Array<TcurrentCard>
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsConnectedSuccess: (state: Sockets) => {
      state.wsConnected = true
    },
    wsConnectedError: (state: Sockets) => {
      state.wsConnected = false
    },
    wsConnectedClosed: (state: Sockets) => {
      state.wsConnected = false
    },
    wsGetMessage: (state: Sockets, action: PayloadAction<TMessage>) => {
      const { total, totalToday, orders } = action.payload
      state.total = total
      state.totalToday = totalToday
      state.orders = orders
    },
    wsConnectedSuccessAuth: (state: Sockets) => {
      state.wsConnectedAuth = true
    },
    wsConnectedErrorAuth: (state: Sockets) => {
      state.wsConnectedAuth = false
    },
    wsConnectedClosedAuth: (state: Sockets) => {
      state.wsConnectedAuth = false
    },
    wsGetMessageAuth: (state: Sockets, action: PayloadAction<TMessage>) => {
      const { orders } = action.payload
      state.ordersAuth = orders
    },
  },
})

export const ordersReducer = ordersSlice.reducer
const {
  wsConnectedSuccess,
  wsConnectedError,
  wsConnectedClosed,
  wsGetMessage,
  wsConnectedSuccessAuth,
  wsConnectedClosedAuth,
  wsConnectedErrorAuth,
  wsGetMessageAuth,
} = ordersSlice.actions

export const wsActions: ISocketActions = {
  wsInit,
  wsSendMessage,
  onOpen: wsConnectedSuccess,
  onClose: wsConnectedClosed,
  onError: wsConnectedError,
  onMessage: wsGetMessage,
}
export const wsActionsAuth: ISocketActions = {
  wsInit: wsAuthInit,
  wsSendMessage: wsSendAuthMessage,
  onOpen: wsConnectedSuccessAuth,
  onClose: wsConnectedClosedAuth,
  onError: wsConnectedErrorAuth,
  onMessage: wsGetMessageAuth,
}
export interface ISocketActions {
  wsInit: ActionCreatorWithoutPayload<string>
  wsSendMessage: ActionCreatorWithPayload<string, string>
  onOpen: ActionCreatorWithoutPayload<string>
  onClose: ActionCreatorWithoutPayload<string>
  onError: ActionCreatorWithPayload<string, string> | ActionCreatorWithoutPayload<string>
  onMessage: ActionCreatorWithPayload<any, string>
}
