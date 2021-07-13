import { sliceName } from './slice'
import { RootState } from '../../store/store'

export const getOrderId = (store: RootState) => store[sliceName].orderId
export const getOrderIsSending = (store: RootState) => store[sliceName].isSending
