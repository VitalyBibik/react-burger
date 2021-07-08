import { IBurger } from '../../types'

export const getSum = (arr: Array<IBurger>) => arr.reduce((acc, el: IBurger) => acc + el.price, 0)
