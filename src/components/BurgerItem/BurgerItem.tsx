import { memo } from 'react'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import style from './BurgerItem.module.scss'
import { PriceItem } from '../PriceItem'
import { ItemTypes } from '../../utils/constants/constants'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import { getIngredientsWithCount } from '../../services/ducks/constructor/selectors'
import { Link, useLocation } from 'react-router-dom'
import {Ingredient} from "../../services/ducks/constructor";

type TBurgerItem = {
    card:Ingredient
}


export const BurgerItem = memo(({ card }: TBurgerItem) => {
  const ingredientsWithCount = useSelector(getIngredientsWithCount)

  const [, dragOrderCard] = useDrag({
    type: ItemTypes.CARD,
    item: card,
  })
  const location = useLocation()

  return (
    <li className={style.container} ref={dragOrderCard} data-item={`${card._id}`}>
      <Link
        className={style.link}
        to={{
          pathname: `/ingredients/${card._id}`,
          state: { background: location },
        }}
      >
        <div className={style.container__image}>
          <img className={style.image} srcSet={card.image_large} alt="text" />
          {ingredientsWithCount[card._id] ? <Counter count={ingredientsWithCount[card._id]} size="small" /> : null}
        </div>
        <div className={style.container__price}>
          <PriceItem price={card.price} />
        </div>
        <p className={cn('text text_type_main-default', style.container__description)}>{card.name}</p>
      </Link>
    </li>
  )
})

BurgerItem.displayName = 'BurgerItem'
