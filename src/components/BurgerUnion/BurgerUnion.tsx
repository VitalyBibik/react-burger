import React, { memo, useState, useEffect, useCallback } from 'react';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { Modal } from '../Modal';
import { apiUrl } from '../../utils/constants'
import { IngredientDetails } from '../IngredientsDetails';
import { useDispatch, useSelector } from 'react-redux';
import { request, request_fail, request_success } from '../../services/ducks/constructor';


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
  order?: null;
};


export const BurgerUnion = memo(() => {

  const dispatch = useDispatch()
  const state = useSelector((store:any) => store.constructorReducer)
  const [modalData, setModalData] = useState<TModalData>({
    isShow: false,
    title: 'Заголовок',
    content: null
  });

  const buttonClose = useCallback(() => {
    setModalData({
      isShow: false,
      title: 'Заголовок',
      content: null,
    })
  },[])

const getProducts = useCallback(
  () => {
    (async () => {
      dispatch(request)
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
          throw new Error('error')
        }
        const data = await res.json()
        dispatch(request_success(data.data))
      }
      catch {
        dispatch(request_fail)
      }
    })();
  },
  [dispatch]
);

  // const getProducts = async () => {
  //   dispatch(request)
  //   try {
  //     const res = await fetch(apiUrl)
  //     if (!res.ok) {
  //       throw new Error('error')
  //     }
  //     const data = await res.json()
  //     dispatch(request_success(data.data))
  //   }
  //   catch {
  //     dispatch(request_fail)
  //   }
  // }

  useEffect( () => {
    getProducts()
  }, [getProducts])



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
           renderModal = {renderModal}
         />
           <BurgerConstructor
           setModal={setModalData}
           />
         </>)
       }
     </div>
      {modalData.isShow && <Modal title={modalData.title && modalData.title} setModal={setModalData} buttonClose={buttonClose}>{modalData.content}</Modal>}
    </>
  );
});
