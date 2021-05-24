import { combineReducers } from "redux";
import { constructorReducer } from '../ducks/constructor';
import { modalReducer } from '../ducks/modal'

export const rootReducer = combineReducers({
  constructorReducer, modalReducer
});
