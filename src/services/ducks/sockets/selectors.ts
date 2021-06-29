import { sliceName } from './slice';

export const getOrders = (store: any) => store[sliceName].orders
export const getTotal = (store:any) => store[sliceName].total
export const getTotalToday = (store:any) => store[sliceName].totalToday
export const getIsLoading = (store:any) => !!store[sliceName].orders
