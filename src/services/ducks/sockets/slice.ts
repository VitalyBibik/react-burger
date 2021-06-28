import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';
export const wsSendAuthMessage = createAction(
  'socket/wsSendAuthMessage',
  (message) => ({ payload: message })
);

export type Sockets = {
  wsConnected: boolean;
  data: Array<any>;
};
const initialState: Sockets = {
  wsConnected: false,
  data: [],
};

export const sliceName = 'socketReducer';

export const socketAllOrders = 'wss://norma.nomoreparties.space/orders/all';
const getSpecialUserOrders =
  "wss://norma.nomoreparties.space/orders/?token='kldfjgkjgk'"; // Нужен accessToken

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
      console.log(action);
      state.wsConnected = false;
    },
    wsConnectedClosed: (state: Sockets, action: PayloadAction<any>) => {
      state.wsConnected = false;
    },
    wsGetMessage: (state: Sockets, action: PayloadAction<any>) => {
      state.data.push(action.payload);
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
