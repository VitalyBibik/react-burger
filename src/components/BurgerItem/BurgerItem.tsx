import { memo, useContext, useMemo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerItem.module.scss';
import { PriceItem } from '../PriceItem';
import { IngredientContext } from '../../context/ingredientContext';
import { BUN } from '../../utils/constants';

type IngredientProps = {
  name: string,
  price: number,
  image_large: string,
  image_mobile: string,
  _id: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  type:string
  findClosureCard: any,
  count?:number
}


export const BurgerItem = memo(({ image_large,
  name,
  price,
  _id,
  findClosureCard,
  calories,
  proteins,
  fat,
  carbohydrates,
  type,
  image_mobile,
  count
}: IngredientProps) => {

  const card = {
    image_large,
    image_mobile,
    name,
    price,
    _id,
    calories,
    proteins,
    fat,
    carbohydrates,
    type,
    count
  }
  // @ts-ignore
  const { state, dispatch } = useContext(IngredientContext)

  const findCard = () => {
    findClosureCard(card)
    dispatch({ type:'add', payload: card})
    }

  const ingredientsWithCount = useMemo(() => {
    return state.data.map((ingredient:any) => {
      return {
        ...ingredient,
        count: state.constructor.filter(
          (item: any) => item._id === ingredient._id
        ).length
      };
    });
  }, [state.data, state.constructor]);
  const newCard = useMemo(() => {
    return ingredientsWithCount.find((item:any) => item._id === card._id)
  },[card._id, ingredientsWithCount])

  const bunItem = state.bun;
  let bunCount = 0
   if (bunItem && card._id === bunItem._id) {
     bunCount = 2
   }

  return (
    <li className={style.container} onClick={findCard}>
      <div className={style.container__image}>
        <img className={style.image} srcSet={image_large} alt="text" />
        <Counter count={newCard.type === BUN ? bunCount : newCard.count } size="small" />
      </div>
      <div className={style.container__price}>
        <PriceItem price={price} />
      </div>
      <p
        className={cn(
          'text text_type_main-default',
          style.container__description
        )}
      >
        {name}
      </p>
    </li>
  );
});
