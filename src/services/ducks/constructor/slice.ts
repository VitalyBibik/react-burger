import type { PayloadAction } from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import { apiUrl, BUN } from '../../../utils/constants';

interface Ingredient  {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image?: string,
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
  hasError: SerializedError | null,
  data: Array<Ingredient>,
  constructor: Array<ConstructorIng>,
  bun: Ingredient | null,
}
const initialState: any = {
  isLoading: false,
  hasError: null,
  data: [],
  constructor: [],
  bun: null,
}

  export const loadIngredients = createAsyncThunk(
      'constructor/loadIngredients',
      async () => {
      const res = await fetch(apiUrl)
      const data = await res.json()
      return data.data
})

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
    }
  },
  extraReducers:(builder => {
    builder.addCase(loadIngredients.pending, (state:burgerState) => {
      state.isLoading = true;
      state.hasError = null;
    });
    builder.addCase(loadIngredients.fulfilled, (state:burgerState, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadIngredients.rejected, (state:burgerState, action) => {
      state.isLoading = false;
      state.hasError = action.error;
    });
  })

  })

export const { add, remove } = constructorSlice.actions
export const constructorReducer = constructorSlice.reducer
