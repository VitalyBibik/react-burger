import { sliceName } from '../constructor'
import { userOrderReducer, sendOrder, TModalData } from './slice'

const initialState: TModalData = {
  orderId: null,
  isSending: false,
  sendError: null,
}

describe(`${sliceName} extraReducers`, () => {
  it('should handle sendOrder Request pending', () => {
    expect(
        userOrderReducer(initialState, {
        type: sendOrder.pending,
      }),
    ).toEqual(
      expect.objectContaining({
        isSending: true,
        sendError: null,
      }),
    )
  })
  it('should handle sendOrder Request fulfilled', () => {
    expect(
        userOrderReducer(initialState, {
        type: sendOrder.fulfilled,
        payload: { order: { number: 123 } },
      }),
    ).toEqual(
      expect.objectContaining({
        isSending: false,
        orderId: 123,
      }),
    )
  })
  it('should handle sendOrder Request rejected', () => {
    expect(
        userOrderReducer(initialState, {
        type: sendOrder.rejected,
        error: 'Fetch request is failed',
      }),
    ).toEqual(
      expect.objectContaining({
        isSending: false,
        sendError: 'Fetch request is failed',
      }),
    )
  })
})
describe(`${sliceName} Reducers`, () => {
  it('should return the initial state', () => {
    expect(userOrderReducer(undefined, { type: undefined })).toEqual(initialState)
  })
})
