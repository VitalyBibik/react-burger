import React, { memo } from 'react'
import style from './IngredientModal.module.scss'
import { IngredientDetails } from '../../components/IngredientsDetails'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { Loader } from '../../components/Loader'
import { useSelector } from 'react-redux'
import { getCardsIsLoading, getData } from '../../services/ducks/constructor/selectors'

type TModalDataProps = {
  fullScreen: boolean
}

export const IngredientModal = memo(({ fullScreen }: TModalDataProps) => {
  const { id }: { id: string } = useParams()
  const cardsArray = useSelector(getData)
  const isLoading = useSelector(getCardsIsLoading)

  const currentCard = cardsArray.find(el => el._id === id)

  const render = () => {
    return (
      <div
        className={cn(style.container, {
          [style.container_full]: !fullScreen,
        })}
      >
        <div className={style.box}>
          <h2 className={cn(style.title, 'text text_type_main-large')}>Детали ингридиента</h2>
          <IngredientDetails
            imageLarge={currentCard!.image_large}
            name={currentCard!.name}
            desc={'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.'}
            calories={currentCard!.calories}
            proteins={currentCard!.proteins}
            fat={currentCard!.fat}
            carbohydrates={currentCard!.carbohydrates}
          />
        </div>
      </div>
    )
  }
  if (!isLoading) return <Loader />
  return render()
})
