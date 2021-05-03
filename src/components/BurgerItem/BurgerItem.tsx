import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';

export const BurgerItem = ({ image_large, name, price }: any) => {
  return (
    <li className={style.container}>
      <div className={style.container__image}>
        <img className={style.image} srcSet={image_large} alt="text" />
        <Counter count={1} size="small" />
      </div>
      <div className={style.container__price}>
        <PriceItem price={price} />
      </div>
      <p
        className={cn(
          'text text_type_main-default',
          style.container__description
        )}
      >
        {name}
      </p>
    </li>
  );
};
