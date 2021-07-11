import type { PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '../constructor'

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

export const wsInit = createAction('socket/wsInit')
export const wsAuthInit = createAction('socket/wsAuthInit')
export const wsSendMessage = createAction('orders/wsSendMessage', message => ({ payload: message }))
export const wsSendAuthMessage = createAction('orders/wsSendAuthMessage', message => ({ payload: message }))

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

export const wsActions = {
  wsInit,
  wsSendMessage,
  onOpen: wsConnectedSuccess,
  onClose: wsConnectedClosed,
  onError: wsConnectedError,
  onMessage: wsGetMessage,
}
export const wsActionsAuth = {
  wsInit: wsAuthInit,
  wsSendMessage: wsSendAuthMessage,
  onOpen: wsConnectedSuccessAuth,
  onClose: wsConnectedClosedAuth,
  onError: wsConnectedErrorAuth,
  onMessage: wsGetMessageAuth,
}
