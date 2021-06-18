import { memo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { ItemTypes } from '../../utils/constants/constants';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getIngredientsWithCount } from '../../services/ducks/constructor/selectors';
import { Link, useLocation } from 'react-router-dom';

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
  count?: number;
};

export const BurgerItem = memo(
  ({
    image_large,
    name,
    price,
    _id,
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
    const ingredientsWithCount = useSelector(getIngredientsWithCount);

    const [, dragOrderCard] = useDrag({
      type: ItemTypes.CARD,
      item: card,
    });
    const location = useLocation();

    return (
      <li className={style.container} ref={dragOrderCard}>
        <Link
          className={style.link}
          to={{
            pathname: `/ingredients/${_id}`,
            state: { background: location },
          }}
        >
          <div className={style.container__image}>
            <img className={style.image} srcSet={image_large} alt='text' />
            {ingredientsWithCount[card._id] ? (
              <Counter count={ingredientsWithCount[card._id]} size='small' />
            ) : null}
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
        </Link>
      </li>
    );
  }
);
