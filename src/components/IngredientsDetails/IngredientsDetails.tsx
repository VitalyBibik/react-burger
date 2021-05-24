import style from './IngredientsDetails.module.scss'
import cn from 'classnames';
import { memo } from 'react';

type IngredientDetailsProps = {
  name: string,
  price?: number,
  image_large: string,
  _id?: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  desc:string
}


export const IngredientDetails = memo(({ image_large, desc, calories, proteins, fat, carbohydrates, name } :IngredientDetailsProps ) => {

  return (
    <div className={style.order}>
      <img src={image_large} alt={desc}/>
      <h3 className={style.title}>{name}</h3>
      <p className={cn(style.desc, 'text text_type_main-default')}>{desc}</p>
      <div className={style.info}>
        <div className={style.infoItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Каллорий, ккал
                    </span>
          <span className="text text_type_digits-default text_color_inactive">
                        {calories}
                    </span>
        </div>
        <div className={style.infoItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Белки, г
                    </span>
          <span className="text text_type_digits-default text_color_inactive">
                        {proteins}
                    </span>
        </div>
        <div className={style.infoItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Жиры, г
                    </span>
          <span className="text text_type_digits-default text_color_inactive">
                        {fat}
                    </span>
        </div>
        <div className={style.infoItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Углеводы, г
                    </span>
          <span className="text text_type_digits-default text_color_inactive">
                        {carbohydrates}
                    </span>
        </div>
      </div>
    </div>
  )
})
