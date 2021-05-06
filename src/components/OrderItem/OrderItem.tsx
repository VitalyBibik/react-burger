import React, { memo } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './OrderItem.module.scss';


type OrderItem = {
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
type OrderItemProps = {
  bread?: OrderItem,
  productArray?: Array<OrderItem>,
  top?:boolean
}

export const OrderItem = memo(({ bread, productArray, top }: OrderItemProps) => {
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
      productArray.map((el: OrderItem) => {
        return (
          <li className={style.container} key={el._id}>
            <div className={style['container__icon']}><DragIcon type="primary" /></div>
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el['image_mobile']}
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


