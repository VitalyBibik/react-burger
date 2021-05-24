import React, { memo } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './OrderItem.module.scss';
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
type OrderItemProps = {
  bread?: OrderItemIngredient,
  productArray?: Array<OrderItemIngredient>,
  top?:boolean
}

export const OrderItem = memo(({ bread, productArray, top }: OrderItemProps) => {
  const dispatch = useDispatch()

  return (
    <>
      {bread && top === true && (
        <div className={cn(style.container, style['container_special'])}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bread.name + ' (верх)'}
            price={bread.price}
            thumbnail={bread['image_mobile']}
          />
        </div>
      )}

      {productArray &&
      productArray.map((el: OrderItemIngredient) => {
        const handleClose = () => {
          dispatch(remove(el))
        }
        return (
          <li className={style.container} key={el.constructorId ? el.constructorId : el._id}>
            <div className={style['container__icon']}><DragIcon type="primary" /></div>
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el['image_mobile']}
              handleClose={handleClose}
            />
          </li>
        );
      })}

      {bread && top === false && (
        <div className={cn(style.container, style['container_special'])}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bread.name + ' (низ)'}
            price={bread.price}
            thumbnail={bread['image_mobile']}
          />
        </div>
      )}
    </>
  );
});


