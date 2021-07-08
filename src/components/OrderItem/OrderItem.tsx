import React, { memo, useCallback } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import style from './OrderItem.module.scss'
import { OrderCard } from '../OrderCard'
import { useDispatch } from 'react-redux'
import { ConstructorIng, sort } from '../../services/ducks/constructor'

type TOrderItemProps = {
  bread?: ConstructorIng
  productArray?: Array<ConstructorIng>
  top?: boolean
}

export const OrderItem = memo(({ bread, productArray, top }: TOrderItemProps) => {
  const dispatch = useDispatch()
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      if (productArray) {
        dispatch(sort({ dragIndex, hoverIndex }))
      }
    },
    [productArray, dispatch],
  )
  return (
    <>
      {bread && top === true && (
        <div className={cn(style.container, style['container_special'])} data-buncontainer={'1'}>
          <ConstructorElement type="top" isLocked={true} text={bread.name + ' (верх)'} price={bread.price} thumbnail={bread['image_mobile']} />
        </div>
      )}

      {productArray &&
        productArray.map((card: ConstructorIng, index) => {
          return <OrderCard key={card.constructorId ? card.constructorId : card._id} card={card} moveCard={moveCard} index={index} />
        })}

      {bread && top === false && (
        <div className={cn(style.container, style['container_special'])} data-buncontainer={'2'}>
          <ConstructorElement type="bottom" isLocked={true} text={bread.name + ' (низ)'} price={bread.price} thumbnail={bread['image_mobile']} />
        </div>
      )}
    </>
  )
})
OrderItem.displayName = 'OrderItem'
