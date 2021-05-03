import React, { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';
import { Popup } from '../Popup';
import { useDisclosure } from '../../hooks';

export const BurgerConstructor = ({ bread, productArray }: any) => {

  const { isOpen, toggle } = useDisclosure(false, {
    onOpen: () => console.log("я открылся")
  });

  return (
    <>
    <div className={style.container}>
      <OrderItem bread={bread} top />
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
