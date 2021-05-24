import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './BurgerIngredients.module.scss';
import { BurgerItem } from '../BurgerItem';
import { BUN, MAIN, SAUCE } from '../../utils/constants';
import { useSelector } from 'react-redux';

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
  renderModal:(card: CardProps) => void;
};

type CardProps = {
  findClosureCard:() => void,
  image_large:string,
  name:string,
  desc?:string,
  calories:number,
  proteins:number,
  fat:number,
  carbohydrates:number,
  price?:number,
  id?:number,
}

export const BurgerIngredients = memo(({
  renderModal
}: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState<string>('bun');

  const findClosureCard = useCallback(
    (card:CardProps) => {
    renderModal(card)
  }, [renderModal])

  const rootRef = useRef(null)
  const bunRef = useRef(null)
  const sauceRef = useRef(null)
  const mainRef = useRef(null)

  const handleScroll = () => {
    // @ts-ignore
    const bunDistance = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
    // @ts-ignore
    const sauceDistance = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
    // @ts-ignore
    const mainDistance = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
    const min = Math.min(bunDistance, sauceDistance, mainDistance)
    const activeTab = min === bunDistance ? 'bun' : min === sauceDistance ? 'sauce' : 'main';
    // @ts-ignore
    setCurrent(prev => (activeTab === prev.current ? prev.current : activeTab))
  }


  useEffect(() => {
    // @ts-ignore
    document.querySelector(`#${current}`).scrollIntoView();
  }, [current]);

  const dataArray = useSelector((store:any) => store.constructorReducer.data)

  const breadArray = useMemo(() => dataArray.filter((el:Ingredient) => el.type === BUN), [dataArray])
  const fillingArray = useMemo(() => dataArray.filter((el:Ingredient) => el.type === MAIN), [dataArray])
  const sauceArray = useMemo(() => dataArray.filter((el:Ingredient) => el.type === SAUCE), [dataArray])

  return (
    <div className={style.container}>
      <h1 className={cn('text text_type_main-large', style.container__title)}>
        Соберите Бургер
      </h1>
      <div className={style.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.scroll} ref={rootRef} onScroll={handleScroll}>
        <h2 className={cn('text text_type_main-large', style.container__title)} id='bun' ref={bunRef}>
          Булки
        </h2>
        <ul className={style.grid}>
          {breadArray.map((el:Ingredient) => (
            <BurgerItem key={el._id} {...el} findClosureCard={findClosureCard}/>
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)} id='sauce' ref={sauceRef}>
          Соусы
        </h2>
        <ul className={style.grid}>
          {sauceArray.map((el:Ingredient) => (
            <BurgerItem key={el._id} {...el} findClosureCard={findClosureCard} />
          ))}
        </ul>
        <h2 className={cn('text text_type_main-large', style.container__title)} id='main' ref={mainRef}>
          Начинки
        </h2>
        <ul className={style.grid}>
          {fillingArray.map((el:Ingredient) => (
            <BurgerItem key={el._id} {...el} findClosureCard={findClosureCard} />
          ))}
        </ul>
      </div>
    </div>
  );
});
