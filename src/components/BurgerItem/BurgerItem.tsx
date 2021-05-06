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
  findClosureCard:(card: { image: string; price: number; name: string; _id: string }) => void
}


export const BurgerItem = memo(({ image_large, name, price, _id, findClosureCard }: IngredientProps) => {

  const card = {
    image:image_large,
    name:name,
    price:price,
    _id:_id,
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
