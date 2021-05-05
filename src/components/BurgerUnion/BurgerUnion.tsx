import { memo, useMemo, useState, useEffect } from 'react';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor';
import style from './BurgerUnion.module.scss';

type Ingredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v?: number,
}

export const BurgerUnion = memo(() => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const getProducts = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients')
      const data = await res.json()
      setState({ ...state, data:data.data, isLoading: false })
    }
    catch {
      setState({ ...state, hasError: true, isLoading: false });
    }
  }

  useEffect( () => {
    getProducts()
  }, [])

  const fillingArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === 'main'), [
    state.data
  ]);
  const breadArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === 'bun'), [
    state.data
  ]);
  const sauceArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === 'sauce'), [
    state.data
  ]);
  const productArray = useMemo(() => sauceArray.concat(fillingArray), [
    sauceArray,
    fillingArray,
  ]);
  const bread = breadArray[0];

  return (
     <div className={style.container}>
       {state.isLoading && 'Загрузка...'}
       {state.hasError && 'Произошла ошибка'}
       {!state.isLoading &&
       !state.hasError &&
       state.data.length &&
       (<><BurgerIngredients
         sauceArray={sauceArray}
         breadArray={breadArray}
         fillingArray={fillingArray}
       />
         <BurgerConstructor
         productArray={productArray}
         bread={bread} />
         </>)
       }
     </div>
  );
});
