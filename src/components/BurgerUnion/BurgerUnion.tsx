import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { Modal } from '../Modal';
import { apiUrl, BUN, MAIN, SAUCE } from '../../utils/constants';
import { IngredientDetails } from '../IngredientsDetails';


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

type CardProps = {
  image_large:string,
  name:string,
  desc?:string,
  calories:number,
  proteins:number,
  fat:number,
  carbohydrates:number,
  price?:number,
  id?:number
}

type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
};

export const BurgerUnion = memo(() => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const [modalData, setModalData] = useState<TModalData>({
    isShow: false,
    title: 'Заголовок',
    content: null
  });

  const buttonClose = useCallback(() => {
    setModalData({
      isShow: false,
      title: 'Заголовок',
      content: null
    })
  },[])


  const getProducts = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    try {
      const res = await fetch(apiUrl)
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

  const fillingArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === MAIN), [
    state.data
  ]);
  const breadArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === BUN), [
    state.data
  ]);
  const sauceArray = useMemo(() => state.data.filter((el:Ingredient) => el.type === SAUCE), [
    state.data
  ]);
  const productArray = useMemo(() => sauceArray.concat(fillingArray), [
    sauceArray,
    fillingArray,
  ]);
  const bread = useMemo(() => breadArray[0], [
    breadArray
  ]);

  const renderModal = useCallback(
    (card:CardProps) => {
    setModalData({
      isShow: true,
      title: 'Детали ингредиента',
      content: <IngredientDetails
        image_large={card.image_large}
        name={card.name}
        desc={'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.'}
        calories={card.calories}
        proteins={card.proteins}
        fat={card.fat}
        carbohydrates={card.carbohydrates}
      />
    })
  },[])

  return (
    <>
     <div className={style.container}>
       {state.hasError && 'Произошла ошибка'}
       {!state.isLoading &&
       !state.hasError &&
       state.data.length &&
       (<>
         <BurgerIngredients
         sauceArray={sauceArray}
         breadArray={breadArray}
         fillingArray={fillingArray}
         renderModal = {renderModal}
       />
         <BurgerConstructor
         productArray={productArray}
         bread={bread}
         setModal={setModalData}
         />
         </>)
       }
     </div>
      {modalData.isShow && <Modal title={modalData.title && modalData.title} setModal={setModalData} buttonClose={buttonClose}>{modalData.content}</Modal>}
    </>
  );
});
