import { constructorReducer } from '../ducks/constructor';
import { orderReducer } from '../ducks/order';
import { authReducer } from '../ducks/auth';
import { socketReducer } from '../ducks/sockets/slice';

// export const rootReducer = combineReducers({
//   constructorReducer, orderReducer, authReducer
// });

export const rootReducer = {
  constructorReducer,
  orderReducer,
  authReducer,
  socketReducer,
};
