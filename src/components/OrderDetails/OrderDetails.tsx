import isDone from '../../images/access.png'
import style from './OrderDetails.module.scss';
import { memo } from 'react';

export const OrderDetails = memo(() => {
  return (
    <div className={style.order}>
      <p className="text text_type_digits-medium mb-4">034536</p>
      <p className="text text_type_main-default mb-4">
        идентификатор заказа
      </p>
      <img src={isDone} className=" mb-4" alt="done"/>
      <p className="text text_type_main-small mb-4">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Ваш заказ закончили готовить
      </p>
    </div>
  )
})
