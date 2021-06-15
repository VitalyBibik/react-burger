import React, { memo, useCallback, useEffect, useState } from 'react';
import style from './IngredientModal.module.scss';
import { IngredientDetails } from '../../components/IngredientsDetails';
import { useParams } from 'react-router-dom';
import { getProductsFetch } from '../../utils/api/api';
import cn from 'classnames';
import {Loader} from "../../components/Loader";

// TODO вынести в интерфейс
type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
  order?: null;
  isLoading:boolean
};

export const IngredientModal = memo(
        ({ fullScreen }: any) => {
  const { id }: any = useParams();

  const [currentCard, setCurrentCard] = useState({
    image_large: '',
    name: '',
    desc: 'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  });
  useEffect(() => {
    getProductsFetch().then((data) => {
      setCurrentCard(data.data.find((el: any) => el._id === id));
      setModalData({
        isShow: true,
        title: currentCard.name,
        isLoading:false,
        content: (
          <IngredientDetails
            image_large={currentCard.image_large}
            name={currentCard.name}
            desc={
              'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.'
            }
            calories={currentCard.calories}
            proteins={currentCard.proteins}
            fat={currentCard.fat}
            carbohydrates={currentCard.carbohydrates}
          />
        ),
      });
    });
  }, [
    currentCard.calories,
    currentCard.carbohydrates,
    currentCard.fat,
    currentCard.image_large,
    currentCard.name,
    currentCard.proteins,
    id,
  ]);

  const [modalData, setModalData] = useState<TModalData>({
    isShow: false,
    title: 'Заголовок',
    content: null,
    isLoading:true
  });
  return (
    <div className={cn(style.container, {
      [style.container_full]:!fullScreen
    })}>
      { modalData.isLoading ? <Loader/> :
        modalData.isShow && (
        <div className={style.box}>
          <h2 className={cn(style.title, 'text text_type_main-large')}>
            Детали ингридиента
          </h2>
          <IngredientDetails
            image_large={currentCard.image_large}
            name={currentCard.name}
            desc={
              'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.'
            }
            calories={currentCard.calories}
            proteins={currentCard.proteins}
            fat={currentCard.fat}
            carbohydrates={currentCard.carbohydrates}
          />
        </div>
      )}
    </div>
  );
});
