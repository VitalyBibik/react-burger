import { combineReducers } from "redux";
import { constructorReducer } from '../ducks/constructor';
import { orderReducer } from '../ducks/order'

export const rootReducer = combineReducers({
  constructorReducer, orderReducer
});
