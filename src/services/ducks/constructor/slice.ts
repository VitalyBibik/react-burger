import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import { BUN } from '../../../utils/constants';

interface Ingredient  {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v?: number,
  desc?:string,
  id?:number
}
interface ConstructorIng extends Ingredient {
  constructorId:string
}

export type burgerState = {
  isLoading: boolean,
  hasError: boolean,
  data: Array<Ingredient>,
  constructor: Array<ConstructorIng>,
  bun: Ingredient | null,
}
const initialState: any = {
  isLoading: false,
  hasError: false,
  data: [],
  constructor: [],
  bun: null,
}
const constructorSlice = createSlice({
  name:'constructor',
  initialState,
  reducers: {
    add: (state:burgerState, action: PayloadAction<Ingredient>) => {
      const card = action.payload
      const newCard = {
        ...card,
        constructorId:uuid()
      }
      if (newCard.type === BUN) {
        return { ...state, bun: newCard };
      } else {
        state.constructor.push(newCard)
      }
    },
    remove: (state:burgerState, action:PayloadAction<Ingredient>) => {
      const index = state.constructor.findIndex((el: { _id: string; }) => el._id === action.payload._id)
      if (index !== -1) {
        state.constructor.splice(index, 1)
      }
    },
    request: (state:burgerState) => {
      state.isLoading = true
      state.hasError = false
    },
    request_fail: (state:burgerState) => {
      state.isLoading = false;
      state.hasError = true
    },
    request_success: (state:burgerState, action:PayloadAction<any>) => {
      state.isLoading = false
      state.data = action.payload
    }

  },

  })

export const { add, remove, request, request_fail, request_success } = constructorSlice.actions
export const constructorReducer = constructorSlice.reducer
