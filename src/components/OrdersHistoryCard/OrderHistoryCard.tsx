import React, { memo } from 'react';
import cn from 'classnames';
import style from './OrderHistoryCard.module.scss';

type Item = {
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
  constructorId?:number;
};
type OrderHistoryCardProps = {
  card:Item,
  last?:boolean,
  length?:number,
  index:number
}
export const OrderHistoryCard = memo(({ card, last = false, length, index } : OrderHistoryCardProps ) => {
// TODO Сделать индексы в обратом порядке
  return (
    <>
      {
        !last ? <li className={style.list}><img src={card.image_mobile} alt={card.name} className={style.img} style={{zIndex:index}} /></li>
             : <li className={style.list}><img src={card.image_mobile} alt={card.name} className={cn(style.img, style.img_last)} />
                <span className={cn(style.number, 'text text_type_main-default')}>{`+${length}`}</span>
               </li>
       }
   </>
  );
});


