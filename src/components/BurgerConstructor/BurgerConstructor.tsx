import React from 'react'
import style from './BurgerConstructor.module.scss'
import { data } from '../../fixtures'
import { OrderItem } from '../OrderItem'

export const BurgerConstructor = () => {
  const sauceArray = data.filter((el) => el.type === 'sauce')
  const fillingArray = data.filter((el) => el.type === 'main')
  const breadArray = data.filter((el) => el.type === 'bun')
  return (
    <div className={style.container}>
      <OrderItem sauceArray = {sauceArray} breadArray = {breadArray} fillingArray = {fillingArray} />
    </div>
  )
}
