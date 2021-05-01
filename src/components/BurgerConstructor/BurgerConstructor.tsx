import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';

export const BurgerConstructor = ({ bread, productArray }: any) => {
  return (
    <div className={style.container}>
      <OrderItem bread={bread} top />
      <div className={style.container__item}>
        <OrderItem productArray={productArray} />
      </div>
      <OrderItem bread={bread} top={false} />
      <div className={style.container__button}>
        <PriceItem price={610} size="medium" />
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
