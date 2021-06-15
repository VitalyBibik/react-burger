import { sliceName } from './slice';

export const getOrderId = (store: any) => store[sliceName].orderId;
