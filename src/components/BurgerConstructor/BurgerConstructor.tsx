import React from 'react'
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.scss'
import { PriceItem } from '../PriceItem'
import { data } from '../../fixtures'

export const BurgerConstructor = () => {
  const sauceArray = data.filter((el) => el.type === 'sauce')
  const fillingArray = data.filter((el) => el.type === 'main')
  const breadArray = data.filter((el) => el.type === 'bun')
  return (
    <div className={style.container}>
      <div className='box'>
        <img src='' alt='' className='box__image' />
        <p className='box__description'>qweqweqwdasd</p>
        <PriceItem price={20}/>
        <LockIcon type='primary' />

      </div>
    </div>
  )
}
