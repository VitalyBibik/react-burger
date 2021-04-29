import React from 'react'
import style from './BurgerConstructor.module.scss'
import { data } from '../../fixtures'
import { OrderItem } from '../OrderItem'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { PriceItem } from '../PriceItem'

export const BurgerConstructor = () => {
  const sauceArray = data.filter((el) => el.type === 'sauce')
  const fillingArray = data.filter((el) => el.type === 'main')
  const breadArray = data.filter((el) => el.type === 'bun')
  return (
    <div className={style.container}>
      <div className={style['container__item']}>
        <OrderItem sauceArray = {sauceArray} breadArray = {breadArray} fillingArray = {fillingArray} />
      </div>
      <div className={style['container__button']}>
        <PriceItem price={610} size={'large'}/>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>

    </div>
  )
}
