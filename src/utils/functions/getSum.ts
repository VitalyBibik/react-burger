import {IBurger} from "../../types";

export const getSum = (arr: any) => arr.reduce((acc: any, el: IBurger) => acc + el.price, 0)
