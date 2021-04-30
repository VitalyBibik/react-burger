import React, { memo, useMemo } from 'react'
import { BurgerIngredients } from '../BurgerIngredients'
import { BurgerConstructor } from '../BurgerConstructor'
import style from './BurgerUnion.module.scss'
import { data } from '../../fixtures'


export const BurgerUnion = memo(() => {

  const fillingArray = useMemo(
    () =>
      data.filter((el) => el.type === 'main'),
    [data]
  );
  const breadArray = useMemo(
    () =>
      data.filter((el) => el.type === 'bun'),
    [data]
  );
  const sauceArray = useMemo(
    () =>
      data.filter((el) => el.type === 'sauce'),
    [data]
  );
    return (
      <div className={style.container}>
          <BurgerIngredients sauceArray = {sauceArray} breadArray = {breadArray} fillingArray = {fillingArray}/>
          <BurgerConstructor sauceArray = {sauceArray} breadArray = {breadArray} fillingArray = {fillingArray} />
      </div>
    )
})
