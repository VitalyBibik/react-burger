import React, { memo } from 'react'
import { BurgerIngredients } from '../../components/BurgerIngredients'
import { BurgerConstructor } from '../../components/BurgerConstructor'
import style from './BurgerUnion.module.scss'
import { useAppSelector } from '../../services/hooks/hooks'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Loader } from '../../components/Loader'
import { getIsLoading } from '../../services/ducks/constructor/selectors'

export const BurgerUnion = memo(() => {
  const isLoading = useAppSelector(getIsLoading)
  const render = () => {
    return (
      <div className={style.container}>
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>
      </div>
    )
  }

  if (isLoading) return <Loader />
  return render()
})
