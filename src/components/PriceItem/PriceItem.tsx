import cn from 'classnames'
import style from './PriceItem.module.scss'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'


type PriceItem =  {
  price:number
}

export const PriceItem = ({ price }: PriceItem) => {
  return (
    <>
    <span className={cn("text text_type_digits-default", style.position)}>{price}</span>
    <CurrencyIcon type="primary" />
    </>
  )
}