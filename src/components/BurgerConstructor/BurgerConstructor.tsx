import React, { memo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';
import { OrderDetails } from '../OrderDetails';
import { apiPost, BUN } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import {request, request_success, setOrder} from "../../services/ducks/order";
import {add, request_fail} from "../../services/ducks/constructor";
import {useDrop} from "react-dnd";

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
  const orderData = useSelector((store:any) => store.constructorReducer.constructor)
  const bread = useSelector((store:any) => store.constructorReducer.bun)
  const dispatch = useDispatch()
  const productArray = orderData.filter((el:Ingredient) => el.type !== BUN )
  const price = (bread ? bread.price * 2 : 0) + orderData.reduce((s:any,v:any) => s + v.price, 0)
  const finalOrder = async () => {
    try {
      dispatch(request)
      const res = await fetch(apiPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: [...orderData, bread],
        }),
      })
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      dispatch(request_success(data))
      setModal({
        isShow: true,
        content: <OrderDetails order = {data.order.number} />,
      })
    }
    catch {
      dispatch(request_fail)
    }
  }
  const handleDrop = (e:any) => {
    e.preventDefault();
  };
  const [{backgroundColor}, dropTarget] = useDrop({
    accept: 'test',
    drop(card){
      dispatch(add(card))
    },
    collect:monitor => ({
      backgroundColor: monitor.isOver() ? '1c1c21' : 'transparent',
    })

  })

  return (
    <>
      { (orderData.length > 0 || bread) &&
      <div className={style.container}>
        <OrderItem bread={bread} top={true} />
        <ul className={style.container__item} ref={dropTarget} onDrop={(e) => handleDrop(e)}>
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
