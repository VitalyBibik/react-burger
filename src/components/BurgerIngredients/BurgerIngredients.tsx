import React, { memo, useEffect, useRef, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import style from './BurgerIngredients.module.scss'
import { BurgerItem } from '../BurgerItem'
import { useAppSelector } from '../../services/hooks/hooks'
import { getBreadArray, getFillingArray, getSauceArray } from '../../services/ducks/constructor/selectors'

export const BurgerIngredients = memo(() => {
  const [current, setCurrent] = useState<string>('bun')

  const rootRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {
      const bunDistance = Math.abs(rootRef?.current?.getBoundingClientRect()?.top - bunRef?.current?.getBoundingClientRect()?.top)
      const sauceDistance = Math.abs(rootRef?.current?.getBoundingClientRect()?.top - sauceRef.current?.getBoundingClientRect()?.top)
      const mainDistance = Math.abs(rootRef?.current?.getBoundingClientRect()?.top - mainRef.current?.getBoundingClientRect()?.top)
      const min = Math.min(bunDistance, sauceDistance, mainDistance)
      const activeTab = min === bunDistance ? 'bun' : min === sauceDistance ? 'sauce' : 'main'
      setCurrent(activeTab)
    }
  }

  useEffect(() => {
    if (current === 'bun') bunRef?.current?.scrollIntoView()
    if (current === 'sauce') sauceRef?.current?.scrollIntoView()
    if (current === 'main') mainRef?.current?.scrollIntoView()
  }, [current])

  const breadArray = useAppSelector(getBreadArray)
  const fillingArray = useAppSelector(getFillingArray)
  const sauceArray = useAppSelector(getSauceArray)
  return (
    <div className={style.container}>
      <h1 className={cn('text text_type_main-large', style.container__title)}>Соберите Бургер</h1>
      <div className={style.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.scroll} ref={rootRef} onScroll={handleScroll}>
        <h2 className={cn('text text_type_main-large', style.container__title)} id="bun" ref={bunRef}>
          Булки
        </h2>
        <ul className={style.grid}>
          {breadArray.map(el => (
            <BurgerItem key={el._id} card={el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)} id="sauce" ref={sauceRef}>
          Соусы
        </h2>
        <ul className={style.grid}>
          {sauceArray.map(el => (
            <BurgerItem key={el._id} card={el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)} id="main" ref={mainRef}>
          Начинки
        </h2>
        <ul className={style.grid}>
          {fillingArray.map(el => (
            <BurgerItem key={el._id} card={el} />
          ))}
        </ul>
      </div>
    </div>
  )
})
BurgerIngredients.displayName = 'BurgerIngredients'
