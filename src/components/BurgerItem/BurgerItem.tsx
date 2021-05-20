import { memo, useContext } from 'react'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import style from './BurgerItem.module.scss'
import { PriceItem } from '../PriceItem'
import { IngredientContext } from '../../context/ingredientContext'

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
  findClosureCard: any,
  count?:number
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
  image_mobile,
  count
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
    count
  }
  // @ts-ignore
  const { dispatch } = useContext(IngredientContext)

  const findCard = () => {
    findClosureCard(card)
    dispatch({ type:'add', payload: card})
    dispatch({ type:'add_counter', payload: card})
    }

  return (
    <li className={style.container} onClick={findCard}>
      <div className={style.container__image}>
        <img className={style.image} srcSet={image_large} alt="text" />
        <Counter count={card.count ? card.count : 0} size="small" />
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
