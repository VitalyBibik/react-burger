import React, { memo, useEffect } from 'react';
import style from './IngredientModal.module.scss';
import { IngredientDetails } from '../../components/IngredientsDetails';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/ducks/constructor';
import {
  getCardsIsLoading,
  getData,
} from '../../services/ducks/constructor/selectors';

// TODO вынести в интерфейс
// type TModalDataProps = {
//   isShow: boolean;
//   title: string;
//   content: React.ReactNode | null;
//   order?: null;
//   isLoading: boolean;
// };

export const IngredientModal = memo(({ fullScreen }: any) => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const cardsArray = useSelector(getData);
  const isLoading = useSelector(getCardsIsLoading);

  const currentCard = cardsArray.find((el: any) => el._id === id);

  console.log(cardsArray, 'cardsModal', isLoading);
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch, id]);

  const render = () => {
    return (
      <div
        className={cn(style.container, {
          [style.container_full]: !fullScreen,
        })}
      >
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
      </div>
    );
  };
  if (!isLoading) return <Loader />;
  return render();
});
