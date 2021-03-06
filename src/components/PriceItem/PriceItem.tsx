import cn from 'classnames'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { memo } from 'react'
import style from './PriceItem.module.scss'

type TPriceItemProps = {
  price: number
  size?: string
  margin?: boolean
}

export const PriceItem = memo(({ price, size = 'default', margin = false }: TPriceItemProps) => {
  const auto = margin === false ? null : style.position_autoMargin
  return (
    <div className={style.box}>
      <span className={cn(`text text_type_digits-${size}`, style.position, auto)}>{price}</span>
      <span className={style['position-icon']}>
        <CurrencyIcon type="primary" />
      </span>
    </div>
  )
})
PriceItem.displayName = 'PriceItem'
