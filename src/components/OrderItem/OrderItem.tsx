import React from 'react'
import { DragIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './OrderItem.module.scss'
import { PriceItem } from '../PriceItem'
import cn from 'classnames'

type OrderItem = {
  "_id": string,
  "name":string,
  "type":string,
  "proteins":number,
  "fat":number,
  "carbohydrates":number,
  "calories":number,
  "price":number,
  "image":string,
  "image_mobile":string,
  "image_large":string,
  "__v":number
}



export const OrderItem = ({ breadArray, productArray }: any) => {

  return (
    <>
      <div className={style.container}>
        <div className={cn(style.box, style['box_special'])}>
          <img src={breadArray[0].image_mobile} alt='White bread' className='box__image' />
          <p className={cn(style['box__description'], 'text text_type_main-default')}>{breadArray[0].name + ' (верх)'}</p>
          <PriceItem price={20} margin={true}/>
          <span className={style['box__lock']}><LockIcon type='secondary' /></span>
        </div>
      </div>

      { productArray.map((el:OrderItem) => {
        return (
          <div className={style.container}>
            <DragIcon type="primary" />
            <div className={style.box}>
              <img src={el.image_mobile} alt='White bread' className='box__image' />
              <p className={cn(style['box__description'], 'text text_type_main-default')}>{el.name}</p>
              <PriceItem price={el.price} margin={true} />
              <span className={style['box__lock']}><LockIcon type='primary' /></span>
            </div>
          </div>
        )
      })
      }
      <div className={style.container}>
        <div className={cn(style.box, style['box_special'])}>
          <img src={breadArray[0].image_mobile} alt='White bread' className='box__image' />
          <p className={cn(style['box__description'], 'text text_type_main-default')}>{breadArray[0].name + ' (низ)'}</p>
          <PriceItem price={20} margin={true} />
          <span className={style['box__lock']}><LockIcon type='secondary' /></span>
        </div>
      </div>
    </>

  )
}