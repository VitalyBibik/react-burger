import cn from 'classnames'
import style from './PriceItem.module.scss'


type PriceItem =  {
  price:number
}

export const PriceItem = ({ price }: PriceItem) => {
  return (
  <span className={cn("text text_type_digits-default", style.position)}>{price}</span>
  )
}