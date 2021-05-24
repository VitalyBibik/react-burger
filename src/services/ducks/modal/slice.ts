import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import React, { ReactNode } from 'react'


type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
  order?: null;
  currentBurger:any
};
const initialState: TModalData = {
  isShow: false,
  title: 'Заголовок',
  content: null,
  currentBurger: null,
}
const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
    openModal: (state:TModalData, action: PayloadAction<ReactNode>) => {
      state.isShow = true
      state.content = action
    },
    closeModal:(state:TModalData) => {
      state.isShow = false
      state.content = null
    }


  },

  })

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer
