import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrder } from '../../../utils/api/api';

export type TModalData = {
  orderId: number | null;
  data: any;
  isSending: boolean;
  sendError: null | SerializedError;
};
const initialState: TModalData = {
  orderId: null,
  data: null,
  isSending: false,
  sendError: null,
};

export const sliceName = 'orderReducer';

export const sendOrder = createAsyncThunk<any, any, any>(
  'order/sendOrder',
  async (data) => {
    return await fetchOrder(data);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state: TModalData) => {
      state.isSending = true;
      state.sendError = null;
    });

    builder.addCase(
      sendOrder.fulfilled,
      (state: TModalData, action: PayloadAction<any>) => {
        console.log(action.payload, 'ORDER ZAKAZ');
        state.orderId = action.payload.order.number;
        state.isSending = false;
      }
    );

    builder.addCase(sendOrder.rejected, (state: TModalData, action: any) => {
      state.isSending = false;
      state.sendError = action.error;
    });
  },
});

export const orderReducer = orderSlice.reducer;
