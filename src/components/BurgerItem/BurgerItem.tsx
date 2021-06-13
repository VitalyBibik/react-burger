import { memo, useMemo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { ItemTypes } from '../../utils/constants/constants';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

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
    const data = useSelector((store: any) => store.constructorReducer.data);
    const constructor = useSelector(
      (store: any) => store.constructorReducer.constructor
    );
    const bunItem = useSelector((store: any) => store.constructorReducer.bun);

    const findCard = () => {
      findClosureCard(card);
    };

    const ingredientsWithCount = useMemo(() => {
      const counters: any = {};
      data.forEach((ingredient: any) => {
        counters[ingredient._id] = constructor.filter(
          (item: any) => item._id === ingredient._id
        ).length;
        if (bunItem && bunItem._id === ingredient._id) {
          counters[ingredient._id] += 2;
        }
      });
      return counters;
    }, [bunItem, constructor, data]);
    const [, dragOrderCard] = useDrag({
      type: ItemTypes.CARD,
      item: card,
    });
    const countRender = ingredientsWithCount[card._id];
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
