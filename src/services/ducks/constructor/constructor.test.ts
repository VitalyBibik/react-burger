import { add, burgerState, constructorReducer, loadIngredients, remove, sliceName, sort } from './slice'
import { data } from '../../../fixtures'
import { v4 as uuid } from 'uuid'

const initialState: burgerState = {
  isLoading: false,
  hasError: null,
  data: [],
  constructor: [],
  bun: null,
}
const card = {
  ...data[1],
  constructorId: uuid(),
}
const card2 = {
  ...data[2],
  constructorId: uuid(),
}

const initialStateSort: burgerState = {
  isLoading: false,
  hasError: null,
  data: [],
  constructor: [card, card2],
  bun: null,
}

describe(`${sliceName} extraReducers`, () => {
  it('should handle loadIngredients Request pending', () => {
    expect(
      constructorReducer(initialState, {
        type: loadIngredients.pending,
      }),
    ).toEqual(
      expect.objectContaining({
        isLoading: true,
        hasError: null,
      }),
    )
  })
  it('should handle loadIngredients Request fulfilled', () => {
    expect(
      constructorReducer(initialState, {
        type: loadIngredients.fulfilled,
        payload: { data: data },
      }),
    ).toEqual(
      expect.objectContaining({
        isLoading: false,
        hasError: null,
        data: data,
      }),
    )
  })
  it('should handle loadIngredients Request rejected', () => {
    expect(
      constructorReducer(initialState, {
        type: loadIngredients.rejected,
        error: 'Fetch request is failed',
      }),
    ).toEqual(
      expect.objectContaining({
        isLoading: false,
        hasError: 'Fetch request is failed',
      }),
    )
  })
})

describe(`${sliceName} Reducers`, () => {
  it('should add standard Card', () => {
    expect(
      constructorReducer(initialState, {
        type: add,
        payload: { ...data[2], constructorId: 123 },
      }),
    ).toEqual(
      expect.objectContaining({
        constructor: [{ ...data[2], constructorId: 123 }],
      }),
    )
  })
  it('should add Bun Card', () => {
    expect(
      constructorReducer(initialState, {
        type: add,
        payload: data[0],
      }),
    ).toEqual(
      expect.objectContaining({
        bun: data[0],
      }),
    )
  })
  it('should remove Card', () => {
    expect(
      constructorReducer(initialState, {
        type: remove,
        payload: { data: data[1] },
      }),
    ).toEqual(
      expect.objectContaining({
        constructor: [],
      }),
    )
  })
  it('should sort Cards', () => {
    expect(
      constructorReducer(initialStateSort, {
        type: sort,
        payload: { dragIndex: 2, hoverIndex: 1 },
      }),
    ).toEqual(
      expect.objectContaining({
        constructor: [card, card2],
      }),
    )
  })
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: undefined })).toEqual(initialState)
  })
})
