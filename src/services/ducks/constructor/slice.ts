import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { BUN } from '../../../utils/constants/constants'
import { loadFetchIngredients } from '../../../utils/api/api'
import { AppDispatch } from '../../store/store'

export interface Ingredient {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image?: string
  image_mobile: string
  image_large: string
  __v?: number
  desc?: string
  id?: number
}
export interface ConstructorIng extends Ingredient {
  constructorId?: string
}
type TSortType = {
  dragIndex: number
  hoverIndex: number
}

export type TBurgerState = {
  isLoading: boolean
  hasError: SerializedError | null
  data: Array<Ingredient>
  constructor: Array<ConstructorIng>
  bun: Ingredient | null
}
const initialState: TBurgerState = {
  isLoading: false,
  hasError: null,
  data: [],
  constructor: [],
  bun: null,
}
type TLoadIngredients = {
  data: Array<Ingredient>
}

export const sliceName = 'constructorReducer'

export const loadIngredients = createAsyncThunk<
  TLoadIngredients,
  void,
  {
    dispatch: AppDispatch
    state: TBurgerState
  }
>('constructor/loadIngredients', async () => {
  return await loadFetchIngredients()
})

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    add: (state: TBurgerState, action: PayloadAction<ConstructorIng>) => {
      const card = action.payload

      if (card.type === BUN) {
        return { ...state, bun: card }
      } else {
        state.constructor.push(card)
      }
    },
    remove: (state: TBurgerState, action: PayloadAction<ConstructorIng>) => {
      const index = state.constructor.findIndex(el => el._id === action.payload._id)
      if (index !== -1) {
        state.constructor.splice(index, 1)
      }
    },
    sort: (state: TBurgerState, action: PayloadAction<TSortType>) => {
      const { dragIndex, hoverIndex } = action.payload
      state.constructor.splice(dragIndex, 0, state.constructor.splice(hoverIndex, 1)[0])
    },
  },
  extraReducers: builder => {
    builder.addCase(loadIngredients.pending, (state: TBurgerState) => {
      state.isLoading = true
      state.hasError = null
    })
    builder.addCase(loadIngredients.fulfilled, (state: TBurgerState, action) => {
      state.data = action.payload.data
      state.isLoading = false
    })
    builder.addCase(loadIngredients.rejected, (state: TBurgerState, action) => {
      state.isLoading = false
      state.hasError = action.error
    })
  },
})

export const { add, remove, sort } = constructorSlice.actions
export const constructorReducer = constructorSlice.reducer
