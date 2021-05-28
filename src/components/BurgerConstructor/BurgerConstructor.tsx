import React, { memo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { OrderItem } from '../OrderItem';
import { PriceItem } from '../PriceItem';
import { OrderDetails } from '../OrderDetails';
import { BUN } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from "../../services/ducks/order";
import { add,  } from "../../services/ducks/constructor";
import { useDrop } from "react-dnd";
import { BurgerStart } from "../BurgerStart";
import cn from "classnames";

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
  const finalOrder =  async () => {
    const array = [...orderData, bread]
    const res = await dispatch(sendOrder(array))
    const data = res as any;
      setModal({
        isShow: true,
        content: <OrderDetails order = {data.payload.order.number} />,
      })
  }
  const handleDrop = (e:any) => {
    e.preventDefault();
  };
  const [{backgroundColor}, dropTarget] = useDrop({
    accept: 'test',
    drop(card:Ingredient){
      dispatch(add(card))
    },
    collect:monitor => ({
      backgroundColor: monitor.isOver() ? '#fff' : 'transparent',
    })
  })
  const marginTopAutoOn = orderData.length > 0 && bread

  return (
    <>
      <div className={cn(style.container, {
        [style.container_auto]: marginTopAutoOn,
      }) }
           ref={dropTarget} onDrop={(e) => handleDrop(e)} style={{backgroundColor}}>
        { (marginTopAutoOn) ?
        <>
          <OrderItem bread={bread} top={true} />
          <ul className={style.container__item} >
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
        </> : <BurgerStart bread = {bread} items={orderData.length > 0}/>
        }
      </div>

    </>
  );
});
