import React, { memo } from 'react';
import cn from 'classnames';
import style from './BurgerStart.module.scss';

export const BurgerStart = memo(({ bread, items }: any) => {
  let text = '';
  if (bread === null && items === false) {
    text = 'Начинай сбор сочного бургера';
  }
  if (bread !== null && items === false) {
    text = 'Выбери ингредиенты';
  }
  if (bread === null && items) {
    text = 'Выбери булку';
  }

  return (
    <div className={cn(style.container)}>
      <h2 className={cn('text text_type_main-large', style.title)}>
        Добро пожаловать в Stellar Burgers
      </h2>
      <p className={cn('text text_type_main-medium')}>{text}</p>
    </div>
  );
});
