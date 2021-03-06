import { sliceName } from './slice'
import { BUN, MAIN, SAUCE } from '../../../utils/constants/constants'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

type TCounters = {
  [key: string]: number
}
export const getIsLoading = (store: RootState) => store[sliceName].isLoading
export const getCardsIsLoading = (store: RootState) => store[sliceName].data.length > 0

export const getOrderData = (store: RootState) => store[sliceName].constructor
export const getBread = (store: RootState) => store[sliceName].bun
export const getData = (store: RootState) => store[sliceName].data
export const getConstructor = (store: RootState) => store[sliceName].constructor

export const getBreadArray = createSelector(getData, dataArray => dataArray.filter(el => el.type === BUN))
export const getFillingArray = createSelector(getData, dataArray => dataArray.filter(el => el.type === MAIN))
export const getSauceArray = createSelector(getData, dataArray => dataArray.filter(el => el.type === SAUCE))
export const getSendOrderArray = createSelector(getOrderData, getBread, (orderData, bread) => [...orderData, bread])

export const getProductArray = createSelector(getOrderData, items => items.filter(el => el.type !== BUN))
export const getPrice = createSelector(
  getBread,
  getOrderData,
  (bread, orderData) => (bread ? bread.price * 2 : 0) + orderData.reduce((s, v) => s + v.price, 0),
)

export const getIngredientsWithCount = createSelector(getData, getOrderData, getBread, (data, constructor, bunItem) => {
  const counters: TCounters = {}
  data.forEach(ingredient => {
    counters[ingredient._id] = constructor.filter(item => item._id === ingredient._id).length
    if (bunItem && bunItem._id === ingredient._id) {
      counters[ingredient._id] += 2
    }
  })
  return counters
})
