import { memo, useContext } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { IngredientContext } from '../../context/ingredientContext'
import { BUN } from '../../utils/constants';
import { v4 as uuid } from 'uuid';

type IngredientProps = {
  name: string,
  price: number,
  image_large: string,
  image_mobile: string,
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
  carbohydrates,
  type,
  image_mobile
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
    type
  }
  // @ts-ignore
  const { state, dispatch } = useContext(IngredientContext)

  const findCard = () => {
    findClosureCard(card)
    const orderArray = state.constructor
    const bunCard = orderArray.find((el: OrderArrayFind) => el.type === BUN)
    const newCard = {
      ...card,
      constructorId:uuid()
    }
    if (card.type === BUN) {
      if ( bunCard !== undefined && bunCard._id !== card._id ) {
        dispatch({ type:'remove', payload:bunCard._id})
        dispatch({ type:'remove', payload:bunCard._id})
        dispatch({ type:'add', payload:newCard})
        dispatch({ type:'add', payload:newCard})
      } else {
        dispatch({ type:'add', payload:newCard})
        dispatch({ type:'add', payload:newCard})
      }
    } else {
      dispatch({ type:'add', payload:newCard})
    }
    test(card, orderArray)
  }

  const test = (card:any, orderArray:any) => {
    let count = 1
    if (card.type === BUN) {
      return 2
    } else {
      for (let item of orderArray) {
        if (card.name === item.name) count++
      }
      console.log(count, 'Кол-во заказа')
      return count
    }
  }

  return (
    <li className={style.container} onClick={findCard}>
      <div className={style.container__image}>
        <img className={style.image} srcSet={image_large} alt="text" />
        <Counter count={0} size="small" />
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
