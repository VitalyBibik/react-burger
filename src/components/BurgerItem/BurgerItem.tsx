import { memo, useContext } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { IngredientContext } from '../../context/ingredientContext'
import { BUN } from '../../utils/constants';

type IngredientProps = {
  name: string,
  price: number,
  image_large: string,
  _id: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  type:string
  findClosureCard: any
}
type OrderArrayFind = {
 _id: string,
  type: string;
}

export const BurgerItem = memo(({ image_large,
  name,
  price,
  _id,
  findClosureCard,
  calories,
  proteins,
  fat,
  carbohydrates, type
}: IngredientProps) => {

  const card = {
    image_large,
    name,
    price,
    _id,
    calories,
    proteins,
    fat,
    carbohydrates,
    type
  }
  // @ts-ignore
  const { state, dispatch } = useContext(IngredientContext)
  const findCard = () => {
    findClosureCard(card)
    const orderArray = state.constructor
    const bunCard = orderArray.find((el: OrderArrayFind) => el.type === BUN)
    if (card.type === BUN) {
      if ( bunCard !== undefined && bunCard._id !== card._id ) {
        dispatch({ type:'remove', payload:bunCard._id})
        dispatch({ type:'remove', payload:bunCard._id})
        dispatch({ type:'add', payload:card._id})
        dispatch({ type:'add', payload:card._id})
      } else {
        dispatch({ type:'add', payload:card._id})
        dispatch({ type:'add', payload:card._id})
      }

    } else {
      dispatch({ type:'add', payload:card._id})
    }
  }

  return (
    <li className={style.container} onClick={findCard}>
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
