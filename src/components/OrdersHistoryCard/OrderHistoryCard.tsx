import React, { memo } from 'react'
import cn from 'classnames'
import style from './OrderHistoryCard.module.scss'
import { Ingredient } from '../../services/ducks/constructor'

type TOrderHistoryCardProps = {
  card: Ingredient
  last?: boolean
  length?: number
  index: number
}
export const OrderHistoryCard = memo(({ card, last = false, length, index }: TOrderHistoryCardProps) => {
  return (
    <>
      {!last ? (
        <li className={style.list}>
          <img src={card.image_mobile} alt={card.name} className={style.img} style={{ zIndex: index }} />
        </li>
      ) : (
        <li className={style.list}>
          <img src={card.image_mobile} alt={card.name} className={cn(style.img, style.img_last)} style={{ zIndex: index }} />
          <span className={cn(style.number, 'text text_type_main-default')}>{`+${length}`}</span>
        </li>
      )}
    </>
  )
})
OrderHistoryCard.displayName = 'OrderHistoryCard'
