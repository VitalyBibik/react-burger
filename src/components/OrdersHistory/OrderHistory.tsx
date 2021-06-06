import React, {memo, useMemo} from 'react';
import cn from 'classnames';
import style from './OrderHistory.module.scss';
import { useDispatch } from "react-redux";
import { data } from "../../fixtures";
import { OrderHistoryCard } from "../OrdersHistoryCard";
import { PriceItem } from "../PriceItem";
import { v4 as uuid } from 'uuid';
import { historyOrderLimit } from "../../utils/constants";

type Burger = {
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
  constructorId?:number;
};


export const OrderHistory = memo(() => {
  const dispatch = useDispatch()
  const colors = {
    canceled:style.canceled,
    inProgress:style.inProgress,
    isDone:style.isDone,
  }
  const testArray = useMemo(() => [data[0], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[11]], []);
  const arrayLength = testArray.length - 1
  const sum = useMemo(() => testArray.reduce((acc, el:Burger) => acc + el.price , 0), [testArray]);
  return (
    <>
      <li className={style.container}>
        <div className={cn(style.container_mini, 'm-6')}>
          <p className={cn('text text_type_digits-default')}>#034535</p>
          <p className={cn('text text_type_main-default text_color_inactive')}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
          <h3 className={cn('text text_type_main-medium')}>Death Star Starship Main бургер</h3>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mt-2')}>
          <p className={cn('text text_type_main-small', colors.canceled )}>Отменен</p>
        </div>
        <div className={cn(style.container_mini, 'm-6')}>
          <ul className={cn(style.burgerList)}>
            { testArray.map((el:Burger, index) => {
              if (index < historyOrderLimit) return <OrderHistoryCard key={uuid()} card={el} index={index} />
              if (index === arrayLength) return <OrderHistoryCard key={uuid()} card={el} last={true} length={arrayLength - historyOrderLimit} index={index} />
            }
            )}
          </ul>
          <PriceItem price={sum}/>
        </div>
      </li>
      <li className={style.container}>
        <div className={cn(style.container_mini, 'm-6')}>
          <p className={cn('text text_type_digits-default')}>#034535</p>
          <p className={cn('text text_type_main-default text_color_inactive')}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
          <h3 className={cn('text text_type_main-medium')}>Death Star Starship Main бургер</h3>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mt-2')}>
          <p className={cn('text text_type_main-small', colors.inProgress )}>Готовится</p>
        </div>
        <div className={cn(style.container_mini, 'm-6')}>
          <ul className={cn(style.burgerList)}>
            { testArray.map((el:Burger, index) => {
                  if (index < historyOrderLimit) return <OrderHistoryCard key={uuid()} card={el} index={index} />
                  if (index === arrayLength) return <OrderHistoryCard key={uuid()} card={el} last={true} length={arrayLength - historyOrderLimit} index={index} />
                }
            )}
          </ul>
          <PriceItem price={sum}/>
        </div>
      </li>
      <li className={style.container}>
        <div className={cn(style.container_mini, 'm-6')}>
          <p className={cn('text text_type_digits-default')}>#034535</p>
          <p className={cn('text text_type_main-default text_color_inactive')}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
          <h3 className={cn('text text_type_main-medium')}>Death Star Starship Main бургер</h3>
        </div>
        <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mt-2')}>
          <p className={cn('text text_type_main-small', colors.isDone )}>Выполнен</p>
        </div>
        <div className={cn(style.container_mini, 'm-6')}>
          <ul className={cn(style.burgerList)}>
            { testArray.map((el:Burger, index) => {
                  if (index < historyOrderLimit) return <OrderHistoryCard key={uuid()} card={el} index={index} />
                  if (index === arrayLength) return <OrderHistoryCard key={uuid()} card={el} last={true} length={arrayLength - historyOrderLimit} index={index} />
                }
            )}
          </ul>
          <PriceItem price={sum}/>
        </div>
      </li>


    </>
  );
});


