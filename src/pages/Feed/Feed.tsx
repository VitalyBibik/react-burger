import style from './Feed.module.scss';
import React, { memo, useEffect } from 'react';
import { OrderHistory } from '../../components/OrdersHistory';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { wsInit } from '../../services/ducks/sockets/slice';

export const Feed = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsInit());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h2 className={cn('text text_type_main-large', style.title)}>
        Лента заказов
      </h2>
      <div className={style.main}>
        <div className={style.left}>
          <OrderHistory smallSize={true} />
        </div>
        <div className={style.right}>
          <div className={cn(style.info, 'mb-15')}>
            <div className={style.inner}>
              <h2 className={cn('text text_type_main-medium', 'mb-6')}>
                Готовы:
              </h2>
              <ul className={style.control}>
                <li
                  className={cn(
                    style.list,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
              </ul>
            </div>
            <div className={style.box_mini}>
              <h2 className={cn('text text_type_main-medium', 'mb-6')}>
                В работе:
              </h2>
              <ul className={style.control}>
                <li
                  className={cn(
                    style.list,
                    style.list_white,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    style.list_white,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
                <li
                  className={cn(
                    style.list,
                    style.list_white,
                    'text text_type_digits-default',
                    'mb-2'
                  )}
                >
                  034533
                </li>
              </ul>
            </div>
          </div>
          <div className={cn('mb-15')}>
            <h2 className={'text text_type_main-medium'}>
              Выполнено за все время:
            </h2>
            <span className={cn('text_type_digits-large', style.shadow)}>
              28 752
            </span>
          </div>
          <div className={style.task}>
            <h2 className={'text text_type_main-medium'}>
              Выполнено за сегодня:
            </h2>
            <span className={cn('text_type_digits-large', style.shadow)}>
              138
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
