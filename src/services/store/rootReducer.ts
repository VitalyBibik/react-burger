import { combineReducers } from "redux";
import { constructorReducer } from '../ducks/constructor';
import { orderReducer } from '../ducks/order'
import { authReducer } from "../ducks/auth";

export const rootReducer = combineReducers({
  constructorReducer, orderReducer, authReducer
});
