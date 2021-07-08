import { sliceName } from './slice'
import { RootState } from '../../store/store'

export const getOrders = (store: RootState) => store[sliceName].orders
export const getTotal = (store: RootState) => store[sliceName].total
export const getTotalToday = (store: RootState) => store[sliceName].totalToday
export const getIsLoading = (store: RootState) => !!store[sliceName].orders

export const getUserOrders = (store: RootState) => store[sliceName].ordersAuth
export const getIsWsConnected = (store: RootState) => store[sliceName].wsConnected
export const getIsWsConnectedAuth = (store: RootState) => store[sliceName].wsConnectedAuth
