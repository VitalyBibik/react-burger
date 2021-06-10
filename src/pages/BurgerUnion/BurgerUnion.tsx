import React, { memo, useState, useEffect, useCallback } from 'react';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { Modal } from '../../components/Modal';
import { IngredientDetails } from '../../components/IngredientsDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadIngredients,
} from '../../services/ducks/constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {Loader} from "../../components/Loader";


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
  const isLoading = useSelector((store:any) => {
    console.log(store)
    return (store.constructorReducer.isLoading)
  })
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

  useEffect( () => {
     dispatch(loadIngredients())
  }, [dispatch])

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

  const render = () => {
   return(<>
      <div className={style.container}>
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients
                renderModal = {renderModal}
            />
            <BurgerConstructor
                setModal={setModalData}
            />
          </DndProvider>
        </>
      </div>
      {modalData.isShow && <Modal title={modalData.title && modalData.title} setModal={setModalData} buttonClose={buttonClose}>{modalData.content}</Modal>}
    </>)
  }

  if (isLoading) return <Loader/>;
  return render();

});
