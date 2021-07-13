import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchOrder } from '../../../utils/api/api'
import { Ingredient } from '../constructor'

export type TModalData = {
  orderId: number | null
  isSending: boolean
  sendError: null | SerializedError
}
type TOrder = {
  order: { number: number }
}

const initialState: TModalData = {
  orderId: null,
  isSending: false,
  sendError: null,
}

export const sliceName = 'userOrderReducer'

export const sendOrder = createAsyncThunk<TOrder, Array<Ingredient | null>, {}>('order/sendOrder', async data => {
  return await fetchOrder(data)
})

const userOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendOrder.pending, (state: TModalData) => {
      state.isSending = true
      state.sendError = null
    })

    builder.addCase(sendOrder.fulfilled, (state: TModalData, action: PayloadAction<TOrder>) => {
      state.orderId = action.payload.order.number
      state.isSending = false
    })
    builder.addCase(sendOrder.rejected, (state: TModalData, action) => {
      state.isSending = false
      state.sendError = action.error
    })
  },
})

export const userOrderReducer = userOrderSlice.reducer
