import { sliceName } from './slice';

export const getOrders = (store: any) => store[sliceName].orders;
export const getTotal = (store: any) => store[sliceName].total;
export const getTotalToday = (store: any) => store[sliceName].totalToday;
export const getIsLoading = (store: any) => !!store[sliceName].orders;

export const getUserOrders = (store: any) => store[sliceName].ordersAuth;
export const getIsWsConnected = (store: any) => store[sliceName].wsConnected;
export const getIsWsConnectedAuth = (store: any) =>
  store[sliceName].wsConnectedAuth;