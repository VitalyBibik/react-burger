import React, { memo } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.scss'
import cn from 'classnames'

export const BurgerIngredients = memo(() => {
  const [current, setCurrent] = React.useState('Булки')
    return (
      <div className={style.container}>
          <h1 className={cn("text text_type_main-large", style['container__title'])}>Соберите Бургер</h1>
        <div style={{ display: 'flex' }}>
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
      </div>

    )
})
