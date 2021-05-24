import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { OrderDetails } from '../../../components/OrderDetails'
import React, { ReactNode } from 'react'


type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
  order?: null;
};
const initialState: TModalData = {
  isShow: false,
  title: 'Заголовок',
  content: null,
}
const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
    open: (state:TModalData, action: PayloadAction<ReactNode>) => {
      state.isShow = true
      state.content = action
    },
    close:(state:TModalData, action: PayloadAction<ReactNode>) => {
      state.isShow = false
      state.content = null
    }


  },

  })

export const { } = modalSlice.actions
export const modalReducer = modalSlice.reducer
