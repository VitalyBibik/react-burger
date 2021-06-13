import React, { memo, useCallback } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './OrderItem.module.scss';
import { OrderCard } from '../OrderCard';
import { useDispatch } from 'react-redux';
import { sort } from '../../services/ducks/constructor';

type OrderItemIngredient = {
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
  constructorId: number;
};
type OrderItemProps = {
  bread?: OrderItemIngredient;
  productArray?: Array<OrderItemIngredient>;
  top?: boolean;
};

export const OrderItem = memo(
  ({ bread, productArray, top }: OrderItemProps) => {
    const dispatch = useDispatch();
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        if (productArray) {
          dispatch(sort({ dragIndex, hoverIndex }));
        }
      },
      [productArray, dispatch]
    );
    return (
      <>
        {bread && top === true && (
          <div className={cn(style.container, style['container_special'])}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={bread.name + ' (верх)'}
              price={bread.price}
              thumbnail={bread['image_mobile']}
            />
          </div>
        )}

        {productArray &&
          productArray.map((card: OrderItemIngredient, index) => {
            return (
              <OrderCard
                key={card.constructorId ? card.constructorId : card._id}
                card={card}
                moveCard={moveCard}
                index={index}
              />
            );
          })}

        {bread && top === false && (
          <div className={cn(style.container, style['container_special'])}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={bread.name + ' (низ)'}
              price={bread.price}
              thumbnail={bread['image_mobile']}
            />
          </div>
        )}
      </>
    );
  }
);
