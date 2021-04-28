import React, { memo, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.scss'
import cn from 'classnames'
import { data } from '../../fixtures'
import { BurgerItem } from '../BurgerItem'

export const BurgerIngredients = memo(() => {
  const [current, setCurrent] = useState('Булки')
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  })
  // React.useEffect(() => {
  //   getProducts();
  // }, [])
  //
  // const getProducts = async () => {
  //   setState({ ...state, hasError: false, isLoading: true });
  //   try {
  //     const res = await fetch('https://api.nomoreparties.co/')
  //     const data = await res.json()
  //     setState({ ...state, data, isLoading: false })
  //   }
  //   catch {
  //     setState({ ...state, hasError: true, isLoading: false });
  //   }
  // }

  const sauceArray = data.filter((el) => el.type == 'sauce')
  const fillingArray = data.filter((el) => el.type == 'main')
  const breadArray = data.filter((el) => el.type == 'bun')

    return (
      <div className={style.container}>
          <h1 className={cn("text text_type_main-large", style['container__title'])}>Соберите Бургер</h1>
        <div className={style.tab}>
          <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
       <div className={style.scroll}>
          <h2 className={cn("text text_type_main-large", style['container__title'])}>Булки</h2>
            <div className={style.grid}>
              {breadArray.map((el) => <BurgerItem key={el._id} {...el} /> )}
            </div>
          <h2 className={cn("text text_type_main-large", style['container__title'])}>Соусы</h2>
            <div className={style.grid}>
              {sauceArray.map((el) => <BurgerItem key={el._id} {...el} /> )}
            </div>
          <h2 className={cn("text text_type_main-large", style['container__title'])}>Начинки</h2>
            <div className={style.grid}>
              {fillingArray.map((el) => <BurgerItem key={el._id} {...el} /> )}
            </div>
       </div>
      </div>
    )
})
