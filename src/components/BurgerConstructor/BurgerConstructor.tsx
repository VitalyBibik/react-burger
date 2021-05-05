import React, { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';

import { useDisclosure } from '../../hooks';
import { Popup } from '../Popup';

type Ingredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v?: number,
}
type BurgerConstructorProps = {
  bread: Ingredient;
  productArray: Array<Ingredient>;
};


export const BurgerConstructor = ({ bread, productArray }: BurgerConstructorProps) => {

  const { isOpen, toggle } = useDisclosure(false, {
    onOpen: () => console.log("я открылся")
  });

  return (
    <>
    <div className={style.container}>
      <OrderItem bread={bread} top={true} />
      <ul className={style.container__item}>
        <OrderItem productArray={productArray} />
      </ul>
      <OrderItem bread={bread} top={false} />
      <div className={style.container__button}>
        <PriceItem price={610} size="medium" />
        <Button type="primary" size="medium" onClick={toggle}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && <Popup open={isOpen} />}
    </div>

    </>
  );
};
