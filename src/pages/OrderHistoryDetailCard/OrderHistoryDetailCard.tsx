import React, { memo, useEffect } from 'react'
import style from './OrderHistoryDetailCard.module.scss'
import cn from 'classnames'
import { PriceItem } from '../../components/PriceItem'
import { getSum } from '../../utils/functions/getSum'
import { useParams, useRouteMatch } from 'react-router-dom'
import { wsActions, wsActionsAuth, wsAuthInit, wsInit } from '../../services/ducks/orders/slice'
import { useDispatch, useSelector } from 'react-redux'
import { getIsWsConnected, getIsWsConnectedAuth, getOrders, getUserOrders } from '../../services/ducks/orders/selectors'
import { getDateInCard } from '../../utils/functions/dates'
import { getData } from '../../services/ducks/constructor/selectors'
import { Loader } from '../../components/Loader'
import { ROUTES } from '../../utils/routes/routes'
import {Ingredient} from "../../services/ducks/constructor";

type TcurrentCard = {
    _id: string,
    ingredients: Array<string>,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number
}
type TOrderIngredientsArrayAcc = {
    [key: string]: { count: number, data:Ingredient}
}
type TIngredientsRender = {
    data:Array<TOrderIngredientsArrayAcc>
}


export const OrderHistoryDetailCard = memo(() => {
  const { id } = useParams<any>() //TODO: ADD TYPES

  const isAuth = !!useRouteMatch(`${ROUTES.PROFILE}`)
  const colors = {
    created: style.created,
    pending: style.pending,
    done: style.done,
  }
  const wsConnected = useSelector(isAuth ? getIsWsConnectedAuth : getIsWsConnected)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isAuth ? wsAuthInit() : wsInit())
    return () => {
      dispatch(isAuth ? wsActionsAuth.onClose : wsActions.onClose)
    }
  }, [isAuth, dispatch])
  const orders = useSelector(isAuth ? getUserOrders : getOrders)
  const productIngredients = useSelector(getData)

  if (orders.length && wsConnected) {
    const currentCard = orders.filter((el:TcurrentCard) => el.number === +id)[0]
    const cardStatus =
      currentCard.status === 'done'
        ? { text: 'Выполнен', colors: colors.done }
        : currentCard.status === 'pending'
        ? { text: 'Готовится', colors: colors.pending }
        : { text: 'Создан', colors: colors.created }
    const orderIngredientsArray = currentCard.ingredients.map((el:string) => productIngredients.find((item) => item._id === el))
    const ingredients = Object.values(
      orderIngredientsArray.reduce((acc:TOrderIngredientsArrayAcc, item: Ingredient) => {
        if (!acc[item._id]) {
          acc[item._id] = {
            count: 0,
            data: item,
          }
        }
        acc[item._id].count++
        return acc
      }, {}),
    )
    const sum = getSum(orderIngredientsArray)
    const render = () => {
      return (
        <div className={style.box}>
          <div className={cn('mb-10', style.center)}>
            <p className={cn('text text_type_digits-default')}>#{currentCard.number}</p>
          </div>
          <div className={style.container_mini}>
            <h3 className={cn('text text_type_main-medium')}>{currentCard.name}</h3>
          </div>
          <div className={cn(style.container_mini, 'mt-3 mb-15')}>
            <p className={cn('text text_type_main-default', cardStatus.colors)}>{cardStatus.text}</p>
          </div>
          <div className={cn(style.container_mini, 'mb-6')}>
            <h3 className={cn('text text_type_main-medium')}>Cостав:</h3>
          </div>
          <ul className={style.container}>
            {ingredients.map((el:any) => {
                console.log(ingredients,'s')
              return (
                <li className={cn(style.card, 'mr-4')} key={el.data._id}>
                  <img src={el.data.image_mobile} alt="eda" className={cn(style.img, 'mr-4')} />
                  <p className={cn('text text_type_main-default', style.right)}>{el.data.name}</p>
                  <span className={cn('text text_type_digits-default', style.numbers)}>
                    {el.count}&thinsp;x&thinsp;
                    <PriceItem price={el.data.price} />
                  </span>
                </li>
              )
            })}
          </ul>
          <div className={style.container_mini}>
            <p className={cn('text text_type_main-default text_color_inactive')}>{getDateInCard(currentCard.createdAt)}</p>
            <PriceItem price={sum} />
          </div>
        </div>
      )
    }
    return render()
  } else {
    return <Loader />
  }
})
