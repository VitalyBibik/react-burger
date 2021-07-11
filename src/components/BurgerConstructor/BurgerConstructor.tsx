import React, { memo, SyntheticEvent } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.scss'
import { OrderItem } from '../OrderItem'
import { PriceItem } from '../PriceItem'
import { ItemTypes } from '../../utils/constants/constants'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import { sendOrder } from '../../services/ducks/userOrder'
import { add, Ingredient } from '../../services/ducks/constructor'
import { useDrop } from 'react-dnd'
import { BurgerStart } from '../BurgerStart'
import cn from 'classnames'
import { push } from 'connected-react-router'
import { ROUTES } from '../../utils/routes/routes'
import { getRefreshToken } from '../../utils/functions/tokens'
import { getBread, getOrderData, getPrice, getProductArray, getSendOrderArray } from '../../services/ducks/constructor/selectors'
import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { getOrderIsSending } from '../../services/ducks/userOrder/selectors'
import { Loader } from '../Loader'

export const BurgerConstructor = memo(() => {
  const dispatch = useAppDispatch()
  const hasToken = !!getRefreshToken()

  const orderData = useAppSelector(getOrderData)
  const bread = useAppSelector(getBread)
  const productArray = useAppSelector(getProductArray)
  const price = useAppSelector(getPrice)

  const sendOrderArray = useAppSelector(getSendOrderArray)
  const orderIsSending = useAppSelector(getOrderIsSending)
  const history = useHistory()
  const location = useLocation()

  const finalOrder = async () => {
    if (hasToken) {
      dispatch(sendOrder(sendOrderArray))
      history.push({
        pathname: `${ROUTES.ORDER}`,
        state: {
          background: location,
        },
      })
    } else {
      dispatch(push(`${ROUTES.LOGIN}`))
    }
  }

  const handleDrop = (e: SyntheticEvent) => {
    e.preventDefault()
  }
  const [{ backgroundColor }, dropTarget] = useDrop({
    accept: ItemTypes.CARD,
    drop(card: Ingredient) {
      const newCard = {
        ...card,
        constructorId: uuid(),
      }
      dispatch(add(newCard))
    },
    collect: monitor => ({
      backgroundColor: monitor.isOver() ? 'grey' : 'transparent',
    }),
  })
  const marginTopAutoOn = bread

  return (
    <>
      <div
        data-dropcontainer={'main'}
        className={cn(style.container, {
          [style.container_auto]: marginTopAutoOn,
        })}
        ref={dropTarget}
        onDrop={e => handleDrop(e)}
        style={{ backgroundColor }}
      >
        {marginTopAutoOn ? (
          <>
            <div className={style.loader}>{orderIsSending ? <Loader /> : null}</div>
            <OrderItem bread={bread} top={true} />
            <ul className={style.container__item} data-productcontainer={'1'}>
              <OrderItem productArray={productArray} />
            </ul>
            <OrderItem bread={bread} top={false} />
            <div className={style.container__button}>
              <PriceItem size="medium" price={price} />
              {bread && (
                <Button type="primary" size="medium" onClick={finalOrder}>
                  Оформить заказ
                </Button>
              )}
            </div>
          </>
        ) : (
          <BurgerStart bread={bread} items={orderData.length > 0} />
        )}
      </div>
    </>
  )
})
BurgerConstructor.displayName = 'BurgerConstructor'
