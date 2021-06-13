import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import style from './OrderHistoryDetailCard.module.scss';
import cn from 'classnames';
import { PriceItem } from '../../components/PriceItem';
import { data } from '../../fixtures';
import { getSum } from '../../utils/functions/getSum';

type OrderItemIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  constructorId: number;
};

export const OrderHistoryDetailCard = memo(() => {
  const { id } = useParams<any>();
  const colors = {
    canceled: style.canceled,
    inProgress: style.inProgress,
    isDone: style.isDone,
  };
  const testArray = useMemo(
    () => [
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8],
      data[9],
      data[11],
      data[11],
    ],
    []
  );
  const ingredients = useMemo(
    () =>
      Object.values(
        testArray.reduce((acc: any, item: any) => {
          if (!acc[item._id]) {
            acc[item._id] = {
              count: 0,
              data: item,
            };
          }
          acc[item._id].count++;
          return acc;
        }, {})
      ),
    [testArray]
  );
  console.log(ingredients);

  const sum = useMemo(() => getSum(testArray), [testArray]);
  return (
    <div className={style.box}>
      <div className={cn('mb-10', style.center)}>
        <p className={cn('text text_type_digits-default')}>#034535</p>
      </div>
      <div className={style.container_mini}>
        <h3 className={cn('text text_type_main-medium')}>
          Black Hole Singularity острый бургер
        </h3>
      </div>
      <div className={cn(style.container_mini, 'mt-3 mb-15')}>
        <p className={cn('text text_type_main-default', colors.inProgress)}>
          Выполнен
        </p>
      </div>
      <div className={cn(style.container_mini, 'mb-6')}>
        <h3 className={cn('text text_type_main-medium')}>Cостав:</h3>
      </div>
      <ul className={style.container}>
        {ingredients.map((el: any) => {
          return (
            <li className={cn(style.card, 'mr-4')} key={el.data._id}>
              <img
                src={el.data.image_mobile}
                alt='eda'
                className={cn(style.img, 'mr-4')}
              />
              <p className={cn('text text_type_main-default', style.right)}>
                {el.data.name}
              </p>
              <span
                className={cn('text text_type_digits-default', style.numbers)}
              >
                {el.count}&thinsp;x&thinsp;
                <PriceItem price={el.data.price} />
              </span>
            </li>
          );
        })}
      </ul>
      <div className={style.container_mini}>
        <p className={cn('text text_type_main-default text_color_inactive')}>
          Сегодня, 16:20 i-GMT+3
        </p>
        <PriceItem price={sum} />
      </div>
    </div>
  );
});
