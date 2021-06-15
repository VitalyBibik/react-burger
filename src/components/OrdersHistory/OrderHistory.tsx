import React, { useMemo } from 'react';
import cn from 'classnames';
import style from './OrderHistory.module.scss';
import {Link, useLocation} from 'react-router-dom';
import { data } from '../../fixtures';
import { OrderHistoryCard } from '../OrdersHistoryCard';
import { PriceItem } from '../PriceItem';
import { v4 as uuid } from 'uuid';
import { historyOrderLimit } from '../../utils/constants/constants';
import { useRouteMatch } from 'react-router-dom';
import { getSum } from '../../utils/functions/getSum';

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
  constructorId?: number;
};
type OrderHistoryProps = {
  smallSize?: boolean;
};

export const OrderHistory = ({ smallSize = false }: OrderHistoryProps) => {
  const colors = {
    canceled: style.canceled,
    inProgress: style.inProgress,
    isDone: style.isDone,
  };
  const { url } = useRouteMatch();
  const testArray = useMemo(
    () => [
      data[0],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8],
      data[9],
      data[11],
    ],
    []
  );
  const arrayLength = testArray.length - 1;
  const sum = useMemo(() => getSum(testArray), [testArray]);
  let location = useLocation()
  return (
    <>
      <li
        className={cn(
          style.container,
          {
            [style.smallSize]: smallSize,
          },
          'mr-2, mb-6'
        )}
      >
        <Link to={{
          pathname:`${url}/${1}`,
          state: {
            background: location
          }
        }} className={style.activeLink}>
          <div className={cn(style.container_mini, 'pt-6 mr-6 ml-6')}>
            <p className={cn('text text_type_digits-default')}>#034535</p>
            <p
              className={cn('text text_type_main-default text_color_inactive')}
            >
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
            <h3 className={cn('text text_type_main-medium')}>
              Death Star Starship Main бургер
            </h3>
          </div>
          <div className={cn(style.container_mini, 'mr-6 ml-6 mt-2')}>
            <p className={cn('text text_type_main-small', colors.isDone)}>
              Отменен
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 pb-6')}>
            <ul className={cn(style.burgerList)}>
              {testArray.map((el: Burger, index) => {
                if (index < historyOrderLimit)
                  return (
                    <OrderHistoryCard key={el._id} card={el} index={index} />
                  );
                if (index === arrayLength)
                  return (
                    <OrderHistoryCard
                      key={el._id}
                      card={el}
                      last={true}
                      length={arrayLength - historyOrderLimit}
                      index={index}
                    />
                  );
                return null;
              })}
            </ul>
            <PriceItem price={sum} />
          </div>
        </Link>
      </li>
      <li
        className={cn(
          style.container,
          {
            [style.smallSize]: smallSize,
          },
          'mr-2, mb-6'
        )}
      >
        <Link to={{
          pathname:`${url}/${2}`,
          state: {
            background: location
          }
        }} className={style.activeLink}>
          <div className={cn(style.container_mini, 'pt-6 mr-6 ml-6')}>
            <p className={cn('text text_type_digits-default')}>#034535</p>
            <p
              className={cn('text text_type_main-default text_color_inactive')}
            >
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
            <h3 className={cn('text text_type_main-medium')}>
              Death Star Starship Main бургер
            </h3>
          </div>
          <div className={cn(style.container_mini, 'mr-6 ml-6 mt-2')}>
            <p className={cn('text text_type_main-small', colors.inProgress)}>
              Готовится
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 pb-6')}>
            <ul className={cn(style.burgerList)}>
              {testArray.map((el: Burger, index) => {
                if (index < historyOrderLimit)
                  return (
                    <OrderHistoryCard key={uuid()} card={el} index={index} />
                  );
                if (index === arrayLength)
                  return (
                    <OrderHistoryCard
                      key={uuid()}
                      card={el}
                      last={true}
                      length={arrayLength - historyOrderLimit}
                      index={index}
                    />
                  );
                return null;
              })}
            </ul>
            <PriceItem price={sum} />
          </div>
        </Link>
      </li>
      <li
        className={cn(
          style.container,
          {
            [style.smallSize]: smallSize,
          },
          'mr-2, mb-6'
        )}
      >
        <Link to={{
          pathname:`${url}/${3}`,
          state: {
            background: location
          }
        }} className={style.activeLink}>
          <div className={cn(style.container_mini, 'pt-6 mr-6 ml-6')}>
            <p className={cn('text text_type_digits-default')}>#034535</p>
            <p
              className={cn('text text_type_main-default text_color_inactive')}
            >
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
            <h3 className={cn('text text_type_main-medium')}>
              Death Star Starship Main бургер
            </h3>
          </div>
          <div className={cn(style.container_mini, 'mr-6 ml-6 mt-2')}>
            <p className={cn('text text_type_main-small', colors.canceled)}>
              Выполнен
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 pb-6')}>
            <ul className={cn(style.burgerList)}>
              {testArray.map((el: Burger, index) => {
                if (index < historyOrderLimit)
                  return (
                    <OrderHistoryCard key={uuid()} card={el} index={index} />
                  );
                if (index === arrayLength)
                  return (
                    <OrderHistoryCard
                      key={uuid()}
                      card={el}
                      last={true}
                      length={arrayLength - historyOrderLimit}
                      index={index}
                    />
                  );
                return null;
              })}
            </ul>
            <PriceItem price={sum} />
          </div>
        </Link>
      </li>
      <li
        className={cn(
          style.container,
          {
            [style.smallSize]: smallSize,
          },
          'mr-2 mb-6'
        )}
      >
        <Link to={{
          pathname:`${url}/${4}`,
          state: {
            background: location
          }
        }} className={style.activeLink}>
          <div className={cn(style.container_mini, 'pt-6 mr-6 ml-6')}>
            <p className={cn('text text_type_digits-default')}>#034535</p>
            <p
              className={cn('text text_type_main-default text_color_inactive')}
            >
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
            <h3 className={cn('text text_type_main-medium')}>
              Death Star Starship Main бургер
            </h3>
          </div>
          <div className={cn(style.container_mini, 'mr-6 ml-6 mt-2')}>
            <p className={cn('text text_type_main-small', colors.canceled)}>
              Отменен
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 pb-6')}>
            <ul className={cn(style.burgerList)}>
              {testArray.map((el: Burger, index) => {
                if (index < historyOrderLimit)
                  return (
                    <OrderHistoryCard key={uuid()} card={el} index={index} />
                  );
                if (index === arrayLength)
                  return (
                    <OrderHistoryCard
                      key={uuid()}
                      card={el}
                      last={true}
                      length={arrayLength - historyOrderLimit}
                      index={index}
                    />
                  );
                return null;
              })}
            </ul>
            <PriceItem price={sum} />
          </div>
        </Link>
      </li>
    </>
  );
};
