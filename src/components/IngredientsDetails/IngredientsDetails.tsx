import style from './IngredientsDetails.module.scss'
import cn from 'classnames';
import { memo } from 'react';

type IngredientDetailsProps = {
  image: string,
  desc: string,
  calories: number,
  proteins: number
  fats: number,
  carbohydrates: number,
  name: string
}


export const IngredientDetails = memo(({ image, desc, calories, proteins, fats, carbohydrates, name }: IngredientDetailsProps) => {
  return (
    <div className={style.order}>
      <img src={image} alt={desc}/>
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
                        {fats}
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
