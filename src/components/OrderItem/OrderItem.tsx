import React, { memo, useContext } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './OrderItem.module.scss';
import { ConstructorContext } from '../../context/constructorContext';


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
  constructorId:number;
};
type OrderItemProps = {
  bread?: OrderItem,
  productArray?: Array<OrderItem>,
  top?:boolean
}

export const OrderItem = memo(({ bread, productArray, top }: OrderItemProps) => {
  // @ts-ignore
  const { dispatch } = useContext(ConstructorContext)

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
        const handleClose = () => {
          dispatch({ type:'remove', payload: el})
          dispatch({ type:'add_counter', payload: el})
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


