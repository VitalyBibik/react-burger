import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerItem.module.scss'
import cn from 'classnames'
import { PriceItem } from '../PriceItem'

type BurgerItem = {
  "_id": string,
  "name":string,
  "type":string,
  "proteins":number,
  "fat":number,
  "carbohydrates":number,
  "calories":number,
  "price":number,
  "image":string,
  "image_mobile":string,
  "image_large":string,
  "__v":number
}

export const BurgerItem = (props:BurgerItem) => {
  return (
    <div className={style.container}>
      <div className={style['container__image']}>
        <img className={style.image} srcSet={props.image_large} alt={'text'}/>
        <Counter count={1} size='small' />
      </div>
      <div className={style['container__price']}>
        <PriceItem price={props.price} />
        <CurrencyIcon type="primary" />
      </div>
      <p className={cn('text text_type_main-default', style['container__description'])}>{props.name}</p>
    </div>)
}
