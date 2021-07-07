import React, { useMemo } from 'react';
import cn from 'classnames';
import style from './OrderHistory.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { OrderHistoryCard } from '../OrdersHistoryCard';
import { PriceItem } from '../PriceItem';
import { historyOrderLimit } from '../../utils/constants/constants';
import { useRouteMatch } from 'react-router-dom';
import { getSum } from '../../utils/functions/getSum';
import { getDateInCard } from '../../utils/functions/dates';
import { useSelector } from 'react-redux';
import { getData } from '../../services/ducks/constructor/selectors';

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
  order?: any;
};

export const OrderHistory = ({
  smallSize = false,
  order,
}: OrderHistoryProps) => {
  const colors = {
    created: style.created,
    pending: style.pending,
    done: style.done,
  };
  let zIndex = 6;
  const status = order.status;
  const cardStatus =
    status === 'done'
      ? { text: 'Выполнен', colors: colors.done }
      : status === 'pending'
      ? { text: 'Готовится', colors: colors.pending }
      : { text: 'Создан', colors: colors.created };

  const { url } = useRouteMatch();
  const productIngredients = useSelector(getData);

  const orderIngredientsArray = order.ingredients.map((el: any) =>
    productIngredients.find((item: any) => item._id === el)
  );

  const ingredientsCardArray = orderIngredientsArray.slice(
    0,
    historyOrderLimit
  );

  const cardCount = orderIngredientsArray.length;
  const isHover = cardCount > 6;

  const sum = useMemo(
    () => getSum(orderIngredientsArray),
    [orderIngredientsArray]
  );
  const location = useLocation();
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
        <Link
          to={{
            pathname: `${url}/${order.number}`,
            state: {
              background: location,
            },
          }}
          className={style.activeLink}
        >
          <div className={cn(style.container_mini, 'pt-6 mr-6 ml-6')}>
            <p
              className={cn('text text_type_digits-default')}
            >{`#${order.number}`}</p>
            <p
              className={cn('text text_type_main-default text_color_inactive')}
            >
              {getDateInCard(order.createdAt)}
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 mb-2')}>
            <h3 className={cn('text text_type_main-medium')}>{order.name}</h3>
          </div>
          <div className={cn(style.container_mini, 'mr-6 ml-6 mt-2')}>
            <p className={cn('text text_type_main-small', cardStatus.colors)}>
              {cardStatus.text}
            </p>
          </div>
          <div className={cn(style.container_mini, 'mt-6 mr-6 ml-6 pb-6')}>
            <ul className={cn(style.burgerList)}>
              {ingredientsCardArray.map((el: Burger, index: number) => {
                return (
                  <OrderHistoryCard
                    key={index}
                    card={el}
                    index={(zIndex -= 1)}
                  />
                );
              })}
              {isHover ? (
                <OrderHistoryCard
                  key={orderIngredientsArray[0]._id}
                  card={orderIngredientsArray[0]}
                  index={(zIndex -= 1)}
                  last={true}
                  length={cardCount - historyOrderLimit}
                />
              ) : null}
            </ul>
            <PriceItem price={sum} />
          </div>
        </Link>
      </li>
    </>
  );
};
