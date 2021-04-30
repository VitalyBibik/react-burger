import React from 'react'
import style from './BurgerConstructor.module.scss'
import { OrderItem } from '../OrderItem'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { PriceItem } from '../PriceItem'

export const BurgerConstructor = ({breadArray, productArray }: any) => {
//  <OrderItem breadArray = {breadArray} />
  console.log(productArray)
  return (
    <div className={style.container}>

      <div className={style['container__item']}>
        <OrderItem productArray={productArray} breadArray = {breadArray} />
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
