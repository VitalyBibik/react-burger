import style from './Feed.module.scss'
import React, { memo, useRef, useState } from 'react';
import { OrderHistory } from "../../components/OrdersHistory";
import cn from "classnames";

type LoginProps = {
  close?: () => void
}

export const Feed = memo(({ close }: LoginProps) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {

  }
  return (
      <div className={style.container}>
        <h2 className={cn('text text_type_main-large', style.title)}>Лента заказов</h2>
        <div className={style.main}>
          <div className={style.left}>
            <OrderHistory smallSize={true}/>
          </div>
          <div className={style.right}>
            <div className={style.info}>
              <div className={style.box_mini}>
                <h2>Готовы:</h2>
                <ul className={style.control}>
                  <li className={style.list}>034533</li>
                  <li className={style.list}>034533</li>
                  <li className={style.list}>034533</li>
                  <li className={style.list}>034533</li>
                  <li className={style.list}>034533</li>
                </ul>
              </div>
            </div>
            <div className={style.box_mini}>
              <h2>В работе:</h2>
              <ul className={style.control}>
                <li className={cn(style.list, style.list_white)}>034533</li>
                <li className={cn(style.list, style.list_white)}>034533</li>
                <li className={cn(style.list, style.list_white)}>034533</li>
              </ul>
            </div>
            <div className={style.task}>
              <h2>Выполнено за все время</h2>
              <p className={'text_type_digits-large'}>28 752</p>
            </div>
            <div className={style.task}>
              <h2>Выполнено за сегодня</h2>
              <p className={'text_type_digits-large'}>138</p>
            </div>
          </div>
        </div>
      </div>

  );
})

