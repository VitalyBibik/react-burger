import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';
export const wsSendAuthMessage = createAction(
  'socket/wsSendAuthMessage',
  (message) => ({ payload: message })
);

export type Sockets = {
  wsConnected: boolean;
  orders: Array<any>;
  total:number|null;
  totalToday: number|null;
};
const initialState: Sockets = {
  wsConnected: false,
  orders: [],
  total:null,
  totalToday:null,


};

export const sliceName = 'socketReducer';

export const socketAllOrders = 'wss://norma.nomoreparties.space/orders/all';
const getSpecialUserOrders = `wss://norma.nomoreparties.space/orders?token=${123}`; // Нужен accessToken

export const wsInit = createAction('socket/wsInit');
export const wsAuthInit = createAction('socket/wsAuthInit');
export const wsSendMessage = createAction(
  'socket/wsSendMessage',
  (message) => ({ payload: message })
);

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    wsConnectedSuccess: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnected = true;
    },
    wsConnectedError: (state: Sockets, action: any) => {
      state.wsConnected = false;
    },
    wsConnectedClosed: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnected = false;
    },
    wsGetMessage: (state: Sockets, action: PayloadAction<any>) => {
      const { total, totalToday, orders } = action.payload
      state.total = total
      state.totalToday = totalToday
      state.orders = orders
    },
  },
});

export const socketReducer = socketSlice.reducer;
const {
  wsConnectedSuccess,
  wsConnectedError,
  wsConnectedClosed,
  wsGetMessage,
} = socketSlice.actions;

export const wsActions = {
  wsInit,
  wsSendMessage,
  onOpen: wsConnectedSuccess,
  onClose: wsConnectedClosed,
  onError: wsConnectedError,
  onMessage: wsGetMessage,
};
