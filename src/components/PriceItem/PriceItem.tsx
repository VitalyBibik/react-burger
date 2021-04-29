import cn from 'classnames'
import style from './PriceItem.module.scss'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'


type PriceItem =  {
  price:number,
  size?:string
}
// Ждать обнову с средним размера кнопки

export const PriceItem = ({ price, size = 'default' }: PriceItem) => {
  return (
    <>
    <span className={cn(`text text_type_digits-${size}`, style.position)}>{price}</span>
      <span className={style['position-icon']}><CurrencyIcon type="primary" /></span>
    </>
  )
}