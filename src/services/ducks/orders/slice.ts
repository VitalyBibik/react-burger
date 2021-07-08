import type { PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'

export type Sockets = {
  wsConnected: boolean
  wsConnectedAuth: boolean
  orders: Array<any>
  ordersAuth: Array<any>
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
export const getSpecialUserOrders = `wss://norma.nomoreparties.space/orders` // Нужен accessToken

export const wsInit = createAction('socket/wsInit')
export const wsAuthInit = createAction('socket/wsAuthInit')
export const wsSendMessage = createAction('orders/wsSendMessage', message => ({ payload: message }))
export const wsSendAuthMessage = createAction('orders/wsSendAuthMessage', message => ({ payload: message }))

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsConnectedSuccess: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnected = true
    },
    wsConnectedError: (state: Sockets, action: any) => {
      state.wsConnected = false
    },
    wsConnectedClosed: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnected = false
    },
    wsGetMessage: (state: Sockets, action: PayloadAction<any>) => {
      const { total, totalToday, orders } = action.payload
      state.total = total
      state.totalToday = totalToday
      state.orders = orders
    },
    wsConnectedSuccessAuth: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnectedAuth = true
    },
    wsConnectedErrorAuth: (state: Sockets, action: any) => {
      state.wsConnectedAuth = false
    },
    wsConnectedClosedAuth: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnectedAuth = false
    },
    wsGetMessageAuth: (state: Sockets, action: PayloadAction<any>) => {
      console.log(action.payload)
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
