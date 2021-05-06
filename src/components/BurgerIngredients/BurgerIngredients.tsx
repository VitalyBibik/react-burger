import { useCallback, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerIngredients.module.scss';
import { BurgerItem } from '../BurgerItem';
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
type BurgerIngredientsProps = {
  breadArray: Array<Ingredient>;
  fillingArray: Array<Ingredient>;
  sauceArray: Array<Ingredient>;
  setModal: any;

};

export const BurgerIngredients = ({
  breadArray,
  fillingArray,
  sauceArray,
  setModal
}: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState('Булки');

  const items = breadArray.concat(fillingArray, sauceArray)

  const showCard= useCallback((e) => {
    const target = e.target.closest('[data-id]');
    if (!target) return;
    const id = target.dataset.id
    if (!items) return;
    const item = items.find(e => e._id === id);
    setModal({
      isShow: true,
      title: 'Детали ингредиента',
      content: <IngredientDetails
        image={item!.image}
        name={item!.name}
        desc={'Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.'}
        calories={987}
        proteins={654}
        fats={321}
        carbohydrates={999}
      />
    })
  },[])
  return (
    <div className={style.container}>
      <h1 className={cn('text text_type_main-large', style.container__title)}>
        Соберите Бургер
      </h1>
      <div className={style.tab}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={style.scroll}>
        <h2 className={cn('text text_type_main-large', style.container__title)}>
          Булки
        </h2>
        <ul className={style.grid} onClick={showCard}>
          {breadArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)}>
          Соусы
        </h2>
        <ul className={style.grid} onClick={showCard}>
          {sauceArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)}>
          Начинки
        </h2>
        <ul className={style.grid} onClick={showCard}>
          {fillingArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
      </div>
    </div>
  );
};
