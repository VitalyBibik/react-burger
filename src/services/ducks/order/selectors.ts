import { sliceName } from './slice'

export const getOrderId = (store: any) => store[sliceName].orderId
export const getOrderIsSending = (store: any) => store[sliceName].isSending
