import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { BUN } from '../../../utils/constants/constants';
import { loadFetchIngredients } from '../../../utils/api/api';

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image?: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  desc?: string;
  id?: number;
}
interface ConstructorIng extends Ingredient {
  constructorId: string;
}
type sortType = {
  dragIndex: number;
  hoverIndex: number;
};

export type burgerState = {
  isLoading: boolean;
  hasError: SerializedError | null;
  data: Array<Ingredient>;
  constructor: Array<ConstructorIng>;
  bun: Ingredient | null;
};
const initialState: any = {
  isLoading: false,
  hasError: null,
  data: [],
  constructor: [],
  bun: null,
};

export const sliceName = 'constructorReducer';

export const loadIngredients = createAsyncThunk(
  'constructor/loadIngredients',
  async () => {
    return await loadFetchIngredients();
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    add: (state: burgerState, action: PayloadAction<Ingredient>) => {
      const card = action.payload;
      const newCard = {
        ...card,
        constructorId: uuid(),
      };
      if (newCard.type === BUN) {
        return { ...state, bun: newCard };
      } else {
        state.constructor.push(newCard);
      }
    },
    remove: (state: burgerState, action: PayloadAction<Ingredient>) => {
      const index = state.constructor.findIndex(
        (el: { _id: string }) => el._id === action.payload._id
      );
      if (index !== -1) {
        state.constructor.splice(index, 1);
      }
    },
    sort: (state: burgerState, action: PayloadAction<sortType>) => {
      const { dragIndex, hoverIndex } = action.payload;
      state.constructor.splice(
        dragIndex,
        0,
        state.constructor.splice(hoverIndex, 1)[0]
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadIngredients.pending, (state: burgerState) => {
      state.isLoading = true;
      state.hasError = null;
    });
    builder.addCase(
      loadIngredients.fulfilled,
      (state: burgerState, action: any) => {
        state.data = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(
      loadIngredients.rejected,
      (state: burgerState, action: any) => {
        state.isLoading = false;
        state.hasError = action.error;
      }
    );
  },
});

export const { add, remove, sort } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
