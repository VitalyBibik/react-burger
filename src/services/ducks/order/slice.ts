import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type TModalData = {
  orderId:number|null,
  data:any,
  isLoading: boolean,
  hasError: boolean,
};
const initialState: TModalData = {
  orderId:null,
  data:null,
  isLoading: false,
  hasError: false,
}

const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers: {
    setOrder: (state:TModalData, action: PayloadAction<any>) => {
      state.data = action.payload
    },
    request: (state:TModalData) => {
      state.isLoading = true
      state.hasError = false
    },
    request_fail: (state:TModalData) => {
      state.isLoading = false
      state.hasError = true
    },
    request_success: (state:TModalData, action:PayloadAction<any>) => {
      state.isLoading = false
      state.data = action.payload
      state.orderId = action.payload.order.number
    }
  },})

export const { setOrder, request, request_success, request_fail } = orderSlice.actions
export const orderReducer = orderSlice.reducer
