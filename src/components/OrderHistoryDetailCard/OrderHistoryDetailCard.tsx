import React, {memo, useEffect, useMemo} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './OrderHistoryDetailCard.module.scss'
import cn from "classnames";
import { PriceItem } from "../PriceItem";
import { data } from "../../fixtures";
import { getSum } from "../../utils/getSum";
import { BUN } from "../../utils/constants";
import { loadIngredients } from "../../services/ducks/constructor";


type OrderItemIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  constructorId:number;
};

export const OrderHistoryDetailCard = memo(() => {
    const { id }  = useParams<any>();
    console.log(id)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadIngredients())
    }, [dispatch]);
  const bunItem = useSelector((store:any) => store.constructorReducer.data.filter((el:any) => el.type === BUN))
  const colors = {
    canceled:style.canceled,
    inProgress:style.inProgress,
    isDone:style.isDone,
  }
  const testArray = useMemo(() => [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[11], data[11]], []);
    const arrayCount = useMemo(() => {
        const counters:any = {};
        testArray.forEach((ingredient:any) => {
            counters[ingredient._id] = data.filter(
                (item:any) => item._id === ingredient._id
            ).length;
            if (bunItem && bunItem._id === ingredient._id) {
                counters[ingredient._id] += 2;
            }
        })
        return counters;
    },[bunItem, testArray])

  const sum = useMemo(() => getSum(testArray), [testArray]);
  return (
      <div className={style.box}>
        <div className={cn('mb-10', style.center)}>
            <p className={cn('text text_type_digits-default')}>#034535</p>
        </div>
          <div className={style.container_mini}>
              <h3 className={cn('text text_type_main-medium')}>Black Hole Singularity острый бургер</h3>
          </div>
          <div className={cn(style.container_mini, 'mt-3 mb-15',)}>
              <p className={cn('text text_type_main-small', colors.inProgress )}>Выполнен</p>
          </div>
          <div className={cn(style.container_mini, 'mb-6')}>
              <h3 className={cn('text text_type_main-medium')}>Cостав:</h3>
          </div>
        <ul className={style.container}>
             <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
            <li className={cn(style.card, 'mr-4')}>
                <img src={testArray[0].image_mobile} alt="eda" className={cn(style.img, 'mr-4')}/>
                <p className={cn('text text_type_main-default', style.right)}>Флюоресцентная булка R2-D3</p>
                <span className={cn('text text_type_digits-default', style.numbers)}>2&thinsp;x&thinsp;<PriceItem price={20} /></span>
            </li>
        </ul>
        <div className={style.container_mini}>
            <p className={cn('text text_type_main-default text_color_inactive')}>Сегодня, 16:20 i-GMT+3</p>
            <PriceItem price={sum} />
        </div>
      </div>
        );
});


