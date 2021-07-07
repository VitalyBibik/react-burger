import React, { memo } from 'react';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import style from './BurgerUnion.module.scss';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Loader } from '../../components/Loader';
import { getIsLoading } from '../../services/ducks/constructor/selectors';

// type CardProps = { TODO:Interface
//   image_large: string;
//   name: string;
//   desc?: string;
//   calories: number;
//   proteins: number;
//   fat: number;
//   carbohydrates: number;
//   price?: number;
//   id?: number;
// };

export const BurgerUnion = memo(() => {
  const isLoading = useSelector(getIsLoading);
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
