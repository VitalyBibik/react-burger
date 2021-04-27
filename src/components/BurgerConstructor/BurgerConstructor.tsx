import React, { memo } from 'react'
import {  } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './BurgerConstructor.module.scss'

export const BurgerConstructor = memo(() => {
    return (
      <div className={style.container}>
        <h1>Соберите Бургер</h1>
    </div>)
})
