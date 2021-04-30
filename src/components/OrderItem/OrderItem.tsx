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


export const OrderItem = ({ bread, productArray, top }: any) => {
  return (
    <>
      { bread && top === true &&
        <div className={style.container}>
        <div className={cn(style.box, style['box_special'])}>
          <img src={bread.image_mobile} alt='White bread' className='box__image' />
          <p className={cn(style['box__description'], 'text text_type_main-default')}>{bread.name + ' (верх)'}</p>
          <PriceItem price={20} margin={true}/>
          <span className={style['box__lock']}><LockIcon type='secondary' /></span>
        </div>
      </div>

      }

      { productArray &&  productArray.map((el:OrderItem) => {
        return (
          <div className={style.container} key={el._id}>
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
      { bread && top === false &&
        <div className={style.container}>
        <div className={cn(style.box, style['box_special'])}>
          <img src={bread.image_mobile} alt='White bread' className='box__image' />
          <p className={cn(style['box__description'], 'text text_type_main-default')}>{bread.name + ' (низ)'}</p>
          <PriceItem price={20} margin={true} />
          <span className={style['box__lock']}><LockIcon type='secondary' /></span>
        </div>
      </div>
      }
    </>

  )
}
