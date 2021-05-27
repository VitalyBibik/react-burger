import React, { memo } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderCard.module.scss';
import { useDispatch } from 'react-redux';
import { remove } from '../../services/ducks/constructor';

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
  constructorId:number;
};
type PropsOrderCard = {
  card: OrderItemIngredient
}


export const OrderCard = memo(({ card }: PropsOrderCard) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(remove(card))
  }
  return (
          <li className={style.container}>
            <div className={style['container__icon']}><DragIcon type="primary" /></div>
            <ConstructorElement
              text={card.name}
              price={card.price}
              thumbnail={card['image_mobile']}
              handleClose={handleClose}
            />
          </li>
        );
});


