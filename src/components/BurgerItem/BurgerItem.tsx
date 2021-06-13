import { memo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { ItemTypes } from '../../utils/constants/constants';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getIngredientsWithCount } from '../../services/ducks/constructor/selectors';

type IngredientProps = {
  name: string;
  price: number;
  image_large: string;
  image_mobile: string;
  _id: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  type: string;
  findClosureCard: any;
  count?: number;
};

export const BurgerItem = memo(
  ({
    image_large,
    name,
    price,
    _id,
    findClosureCard,
    calories,
    proteins,
    fat,
    carbohydrates,
    type,
    image_mobile,
    count,
  }: IngredientProps) => {
    const card = {
      image_large,
      image_mobile,
      name,
      price,
      _id,
      calories,
      proteins,
      fat,
      carbohydrates,
      type,
      count,
    };
    const findCard = () => {
      findClosureCard(card);
    };
    const ingredientsWithCount = useSelector(getIngredientsWithCount);
    const countRender = ingredientsWithCount[card._id];

    const [, dragOrderCard] = useDrag({
      type: ItemTypes.CARD,
      item: card,
    });

    return (
      <li className={style.container} onClick={findCard} ref={dragOrderCard}>
        <div className={style.container__image}>
          <img className={style.image} srcSet={image_large} alt='text' />
          {countRender ? <Counter count={countRender} size='small' /> : null}
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
  }
);
