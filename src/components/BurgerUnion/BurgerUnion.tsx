import React from 'react'
import { BurgerIngredients } from '../BurgerIngredients'
import { BurgerConstructor } from '../BurgerConstructor'
import style from './BurgerUnion.module.scss'




export const BurgerUnion = () => {
    return (
      <div className={style.container}>
          <BurgerIngredients />
          <BurgerConstructor />
      </div>
    )

}
