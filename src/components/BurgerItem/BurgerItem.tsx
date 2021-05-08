import { memo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';

type IngredientProps = {
  name: string,
  price: number,
  image_large: string,
  _id: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  findClosureCard:any
}


export const BurgerItem = memo(({ image_large,
  name,
  price,
  _id,
  findClosureCard,
  calories,
  proteins,
  fat,
  carbohydrates
}: IngredientProps) => {

  const card = {
    image_large,
    name,
    price,
    _id,
    calories,
    proteins,
    fat,
    carbohydrates
  }
  const findCard = () => {
    findClosureCard(card)
  }

  return (
    <li className={style.container} data-id={_id} onClick={findCard}>
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
});
