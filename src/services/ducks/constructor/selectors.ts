import { sliceName } from './slice';
import { BUN, MAIN, SAUCE } from '../../../utils/constants/constants';
import { createSelector } from '@reduxjs/toolkit';

// TODO: Сделать в интерфейс ингридиент
type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
};

export const getIsLoading = (store: any) => store[sliceName].isLoading;
export const getCardsIsLoading = (store:any) => store[sliceName].data.length > 0


export const getOrderData = (store: any) => store[sliceName].constructor;
export const getBread = (store: any) => store[sliceName].bun;
export const getData = (store: any) => store[sliceName].data;
export const getConstructor = (store: any) => store[sliceName].constructor;

export const getBreadArray = createSelector(getData, (dataArray) =>
  dataArray.filter((el: Ingredient) => el.type === BUN)
);
export const getFillingArray = createSelector(getData, (dataArray) =>
  dataArray.filter((el: Ingredient) => el.type === MAIN)
);
export const getSauceArray = createSelector(getData, (dataArray) =>
  dataArray.filter((el: Ingredient) => el.type === SAUCE)
);
export const getSendOrderArray = createSelector(
  getOrderData,
  getBread,
  (orderData, bread) => [...orderData, bread]
);

export const getProductArray = createSelector(getOrderData, (items) =>
  items.filter((el: Ingredient) => el.type !== BUN)
);
export const getPrice = createSelector(
  getBread,
  getOrderData,
  (bread, orderData) =>
    (bread ? bread.price * 2 : 0) +
    orderData.reduce((s: any, v: any) => s + v.price, 0)
);

export const getIngredientsWithCount = createSelector(
  getData,
  getOrderData,
  getBread,
  (data, constructor, bunItem) => {
    const counters: any = {};
    data.forEach((ingredient: any) => {
      counters[ingredient._id] = constructor.filter(
        (item: any) => item._id === ingredient._id
      ).length;
      if (bunItem && bunItem._id === ingredient._id) {
        counters[ingredient._id] += 2;
      }
    });
    return counters;
  }
);
