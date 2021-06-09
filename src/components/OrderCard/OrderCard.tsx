import React, { memo, useRef } from 'react'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderCard.module.scss';
import { useDispatch } from 'react-redux';
import { remove } from '../../services/ducks/constructor';
import { useDrag, useDrop } from 'react-dnd';
import {ItemTypes} from "../../utils/constants/constants";

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
  constructorId:number;
};
type PropsOrderCard = {
  card: OrderItemIngredient,
  moveCard: (dragIndex:number, hoverIndex:number) => void,
  index: number
}


export const OrderCard = memo(({ card, moveCard, index }: PropsOrderCard) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLLIElement>(null )
  const handleClose = () => {
    dispatch(remove(card))
  }
  const [, drop] = useDrop({
    accept: ItemTypes.SORT,
    hover(item:any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SORT,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))
  return (
          <li className={style.container} ref={ref} style={{opacity}}>
            <div className={style['container__icon']}><DragIcon type="primary" /></div>
            <ConstructorElement
              text={card.name}
              price={card.price}
              thumbnail={card['image_mobile']}
              handleClose={handleClose}
            />
          </li>
        );
});


