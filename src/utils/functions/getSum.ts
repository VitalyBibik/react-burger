import { IBurger } from '../../types'
import { Ingredient } from '../../services/ducks/constructor'

export const getSum = (arr: (Ingredient | undefined)[]) => arr.reduce((acc, el) => acc + el!.price, 0)
