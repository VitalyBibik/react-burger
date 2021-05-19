import React, { memo, useContext, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';
import { OrderDetails } from '../OrderDetails';
import { ConstructorContext } from '../../context/constructorContext';
import { apiPost, BUN } from '../../utils/constants';


type Ingredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v?: number,
}

type BurgerConstructorProps = {
  setModal: any
};


export const BurgerConstructor = memo(({ setModal }: BurgerConstructorProps) => {
  // @ts-ignore
  const { state } = useContext(ConstructorContext)
  const orderData = state.constructor
  // const apiData = state.data

  const breadArray = useMemo(() => orderData.filter((el:Ingredient) => el.type === BUN), [orderData])
  const bread = breadArray[0]
  const productArray = orderData.filter((el:Ingredient) => el.type !== BUN )

  let price = 0
   for (let item of orderData) {
     price += item.price
     }




  const finalOrder = async () => {
    try {
      const res = await fetch(apiPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: orderData,
        }),
      })
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      setModal({
        isShow: true,
        content: <OrderDetails order = {data.order.number} />,
      })
    }
    catch {

    }

  }

  return (
    <>
      { orderData.length > 0 &&
      <div className={style.container}>
        <OrderItem bread={bread} top={true} />
        <ul className={style.container__item}>
          <OrderItem productArray={productArray} />
        </ul>
        <OrderItem bread={bread} top={false} />
        <div className={style.container__button}>
          <PriceItem size="medium" price={price} />
          { bread &&
          <Button type="primary" size="medium" onClick={finalOrder}>
            Оформить заказ
          </Button> }
        </div>
      </div>
    }
    </>
  );
});
