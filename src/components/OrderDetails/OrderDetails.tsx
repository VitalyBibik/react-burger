import isDone from '../../images/access.png';
import style from './OrderDetails.module.scss';
import React, { memo } from 'react';
import cn from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTES } from '../../utils/routes/routes';
import {getOrderId} from "../../services/ducks/order/selectors";


export const OrderDetails = memo(() => {
  const dispatch = useDispatch();
  const orderId = useSelector(getOrderId)
  const goToOrderList = () => {
    dispatch(push(`${ROUTES.FEED}`));
  };

  return (
    <div className={style.order}>
      <p className={cn('text text_type_digits-medium mb-4', style.shadow)}>
        {orderId}
      </p>
      <p className='text text_type_main-default mb-4'>идентификатор заказа</p>
      <img src={isDone} className='mb-4' alt='done' />
      <p className='text text_type_main-small mb-4'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-small text_color_inactive mb-4'>
        Ваш заказ закончили готовить
      </p>
      <Button type='primary' size='medium' onClick={goToOrderList}>
        Перейти в ленту заказов
      </Button>
    </div>
  );
});
