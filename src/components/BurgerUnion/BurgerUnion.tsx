import React, { memo, useState, useEffect, useCallback, useReducer } from 'react';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { Modal } from '../Modal';
import { apiUrl } from '../../utils/constants';
import { IngredientDetails } from '../IngredientsDetails';
import { ConstructorContext } from '../../context/constructorContext'
import { IngredientContext } from '../../context/ingredientContext'
import produce from 'immer';
import { data } from '../../fixtures';

// type Ingredient = {
//   _id: string,
//   name: string,
//   type: string,
//   proteins: number,
//   fat: number,
//   carbohydrates: number,
//   calories: number,
//   price: number,
//   image: string,
//   image_mobile: string,
//   image_large: string,
//   __v?: number,
// }

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
type requestProp = {
 isLoading: boolean; hasError: boolean;
}

const burgerInitialState = {
  isLoading: false,
  hasError: false,
  data: [],
  constructor: [],
}

function reducer(state:any, action:any) {
  switch (action.type) {
    case "request":
      return produce(state, (draft: requestProp) => {
        draft.isLoading = true;
        draft.hasError = false;
    })
    case 'request_fail':
      return produce(state, (draft: requestProp) => {
        draft.hasError = true;
        draft.isLoading = false;
      })
    case 'request_success':
      return produce(state, (draft: any) => {
        draft.data = action.payload;
        draft.isLoading = false;
      })
    case 'add':
      return produce(state, (draft: any) => {
        const item = draft.data.find((el: any) => el._id === action.payload)
        draft.constructor.push(item);
      })
    case 'remove':
      return produce(state, (draft: any) => {
        const item = draft.constructor.find((el: any) => el._id === action.payload)
        draft.constructor.filter((el: any) => el._id !== item._id);
      })
    default:
      return state
  }
}

export const BurgerUnion = memo(() => {

  const [state, dispatch] = useReducer(reducer, burgerInitialState);

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


  const getProducts = async () => {
   dispatch({ type: 'request' })
    try {
      const res = await fetch(apiUrl)
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      dispatch({ type: 'request_success', payload: data.data })
      dispatch({ type:'add', payload:'609a337df07d7e0026403ac6'})
      dispatch({ type:'add', payload:'609a337df07d7e0026403acc'})
      dispatch({ type:'add', payload:'609a337df07d7e0026403acb'})
      dispatch({ type:'add', payload:'609a337df07d7e0026403ad2'})

    }
    catch {
      dispatch({ type: 'request_fail' })
    }
  }

  useEffect( () => {
    getProducts()
  }, [])

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
         <IngredientContext.Provider value={{state, dispatch}}>
           <BurgerIngredients
           renderModal = {renderModal}
         />
         </IngredientContext.Provider>
         <ConstructorContext.Provider value={{state, dispatch}}>
           <BurgerConstructor
           setModal={setModalData}
           />
         </ConstructorContext.Provider>
         </>)
       }
     </div>
      {modalData.isShow && <Modal title={modalData.title && modalData.title} setModal={setModalData} buttonClose={buttonClose}>{modalData.content}</Modal>}
    </>
  );
});
