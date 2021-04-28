import React, { memo } from 'react'
import {  } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './BurgerConstructor.module.scss'

export const BurgerConstructor = memo(() => {
    return (
      <div className={style.container}>
        <div className='box'>
          <img src='' alt='' className='box__image' />
          <p className='box__description'></p>

        </div>
      </div>
    )
})
