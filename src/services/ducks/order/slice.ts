import type {PayloadAction, SerializedError} from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiPost } from "../../../utils/constants";

type TModalData = {
  orderId:number|null,
  data:any,
  isSending: boolean,
  sendError: SerializedError | null,
};
const initialState: TModalData = {
  orderId:null,
  data:null,
  isSending: false,
  sendError: null,

}

export const sendOrder = createAsyncThunk<any, any, any>(
    'order/sendOrder',
    async (data:any) => {
      const res = await fetch(apiPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: data,
        }),
      })
      return await res.json()
    }
);

const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers: {
    setOrder: (state:TModalData, action: PayloadAction<any>) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state:TModalData, action) => {
      state.isSending = true;
      state.sendError = null;
    });

    builder.addCase(sendOrder.fulfilled, (state:TModalData, action) => {
      state.orderId = action.payload.order.number
      state.isSending = false;
    });

    builder.addCase(sendOrder.rejected, (state:TModalData, action) => {
      state.isSending = false;
      state.sendError = action.error;
    });
  }
})

export const { setOrder } = orderSlice.actions
export const orderReducer = orderSlice.reducer
