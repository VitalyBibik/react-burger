import { Ingredient } from '../../services/ducks/constructor'

export const getSum = (arr: Array<Ingredient>) => arr.reduce((acc, el) => acc + el!.price, 0)
