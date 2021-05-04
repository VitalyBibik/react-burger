import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerIngredients.module.scss';
import { BurgerItem } from '../BurgerItem';


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
type BurgerConstructorProps = {
  breadArray: Array<Ingredient>;
  fillingArray: Array<Ingredient>;
  sauceArray: Array<Ingredient>;
};

export const BurgerIngredients = ({
  breadArray,
  fillingArray,
  sauceArray,
}: BurgerConstructorProps) => {
  const [current, setCurrent] = useState('Булки');
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  // React.useEffect(() => {
  //   getProducts();
  // }, [])
  //
  // const getProducts = async () => {
  //   setState({ ...state, hasError: false, isLoading: true });
  //   try {
  //     const res = await fetch('https://api.nomoreparties.co/')
  //     const data = await res.json()
  //     setState({ ...state, data, isLoading: false })
  //   }
  //   catch {
  //     setState({ ...state, hasError: true, isLoading: false });
  //   }
  // }

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
        <ul className={style.grid}>
          {breadArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)}>
          Соусы
        </h2>
        <ul className={style.grid}>
          {sauceArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)}>
          Начинки
        </h2>
        <ul className={style.grid}>
          {fillingArray.map((el) => (
            <BurgerItem key={el._id} {...el} />
          ))}
        </ul>
      </div>
    </div>
  );
};
