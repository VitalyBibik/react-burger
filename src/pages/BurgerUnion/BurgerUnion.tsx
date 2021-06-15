import React, { memo, useState, useEffect, useCallback } from 'react';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { Modal } from '../../components/Modal';
import { IngredientDetails } from '../../components/IngredientsDetails';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/ducks/constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Loader } from '../../components/Loader';
import { getIsLoading } from '../../services/ducks/constructor/selectors';

type CardProps = {
  image_large: string;
  name: string;
  desc?: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price?: number;
  id?: number;
};

type TModalData = {
  isShow: boolean;
  title: string;
  content: React.ReactNode | null;
  order?: null;
};

export const BurgerUnion = memo(() => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const render = () => {
    return (
        <div className={style.container}>
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        </div>
    );
  };

  if (isLoading) return <Loader />;
  return render();
});
