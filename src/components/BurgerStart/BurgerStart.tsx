import React, { memo } from 'react'
import cn from 'classnames'
import style from './BurgerStart.module.scss'
import { IBurger } from '../../types'

type TBurgerStartProps = {
  bread: IBurger
  items: boolean
}

export const BurgerStart = memo(({ bread, items }: TBurgerStartProps) => {
  let text = ''
  if (bread === null && !items) {
    text = 'Начинай сбор сочного бургера'
  }
  if (bread === null && items) {
    text = 'Выбери булку'
  }

  return (
    <div className={cn(style.container)}>
      <h2 className={cn('text text_type_main-large', style.title)}>Добро пожаловать в Stellar Burgers</h2>
      <p className={cn('text text_type_main-medium')}>{text}</p>
    </div>
  )
})
BurgerStart.displayName = 'BurgerStart'
