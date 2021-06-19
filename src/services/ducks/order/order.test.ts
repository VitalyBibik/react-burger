import { sliceName } from '../constructor';
import { orderReducer, sendOrder, TModalData } from './slice';

const initialState: TModalData = {
  orderId: null,
  data: null,
  isSending: false,
  sendError: null,
};

describe(`${sliceName} extraReducers`, () => {
  it('should handle sendOrder Request pending', () => {
    expect(
      orderReducer(initialState, {
        type: sendOrder.pending,
      })
    ).toEqual(
      expect.objectContaining({
        isSending: true,
        sendError: null,
      })
    );
  });
  it('should handle sendOrder Request fulfilled', () => {
    expect(
      orderReducer(initialState, {
        type: sendOrder.fulfilled,
        payload: { order: { number: 123 } },
      })
    ).toEqual(
      expect.objectContaining({
        isSending: false,
        orderId: 123,
      })
    );
  });
  it('should handle sendOrder Request rejected', () => {
    expect(
      orderReducer(initialState, {
        type: sendOrder.rejected,
        error: 'Fetch request is failed',
      })
    ).toEqual(
      expect.objectContaining({
        isSending: false,
        sendError: 'Fetch request is failed',
      })
    );
  });
});
