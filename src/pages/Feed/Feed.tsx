import style from './Feed.module.scss'
import React, { memo, useEffect } from 'react'
import { OrderHistory } from '../../components/OrdersHistory'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { wsActions, wsInit } from '../../services/ducks/orders/slice'
import { Loader } from '../../components/Loader'
import { getIsLoading, getOrders, getTotal, getTotalToday } from '../../services/ducks/orders/selectors'
import { loadIngredients } from '../../services/ducks/constructor'
import { getData } from '../../services/ducks/constructor/selectors'

export const Feed = memo(() => {
  const dispatch = useDispatch()
  const orders = useSelector(getOrders)
  const total = useSelector(getTotal)
  const totalToday = useSelector(getTotalToday)
  const isLoading = useSelector(getIsLoading)
  const data = useSelector(getData)

  useEffect(() => {
    dispatch(wsInit())
    data.length === 0 && dispatch(loadIngredients())
    return () => {
      dispatch(wsActions.onClose)
    }
  }, [data.length, dispatch])

  const done = orders.filter((el: any) => el.status === 'done')
  const inProgress = orders.filter((el: any) => el.status !== 'done')

  const render = () => {
    return (
      <div className={style.container}>
        <h2 className={cn('text text_type_main-large', style.title)}>Лента заказов</h2>
        <div className={style.main}>
          <div className={style.left}>
            {orders.map((el: any, index: number) => (
              <OrderHistory smallSize={true} order={el} key={index} />
            ))}
          </div>
          <div className={style.right}>
            <div className={cn(style.info, 'mb-15')}>
              <div className={style.inner}>
                <h2 className={cn('text text_type_main-medium', 'mb-6')}>Готовы:</h2>
                <ul className={style.control}>
                  {done.map((el: any, index: number) => (
                    <li className={cn(style.list, 'text text_type_digits-default', 'mb-2')} key={el._id}>
                      {el.number}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={style.box_mini}>
                <h2 className={cn('text text_type_main-medium', 'mb-6')}>В работе:</h2>
                <ul className={style.control}>
                  {inProgress.map((el: any, index: number) => (
                    <li className={cn(style.list, style.list_white, 'text text_type_digits-default', 'mb-2')} key={el._id}>
                      {el.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={cn('mb-15')}>
              <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
              <span className={cn('text_type_digits-large', style.shadow)}>{total}</span>
            </div>
            <div className={style.task}>
              <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
              <span className={cn('text_type_digits-large', style.shadow)}>{totalToday}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return isLoading ? render() : <Loader />
})
