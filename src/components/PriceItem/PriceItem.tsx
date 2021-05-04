import cn from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './PriceItem.module.scss';

type PriceItem = {
  price: number;
  size?: string;
  margin?: boolean;
};

export const PriceItem = ({
  price,
  size = 'default',
  margin = false,
}: PriceItem) => {
  const auto = margin === false ? null : style.position_autoMargin;

  return (
    <>
      <span
        className={cn(`text text_type_digits-${size}`, style.position, auto)}
      >
        {price}
      </span>
      <span className={style['position-icon']}>
        <CurrencyIcon type="primary" />
      </span>
    </>
  );
};
