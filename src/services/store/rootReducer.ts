import { constructorReducer } from '../ducks/constructor';
import { orderReducer } from '../ducks/order';
import { authReducer } from '../ducks/auth';
import { ordersReducer } from '../ducks/orders/slice';

export const rootReducer = {
  constructorReducer,
  orderReducer,
  authReducer,
  ordersReducer,
};
