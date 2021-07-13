import { constructorReducer } from '../ducks/constructor'
import { userOrderReducer } from '../ducks/userOrder'
import { authReducer } from '../ducks/auth'
import { ordersReducer } from '../ducks/orders/slice'

export const rootReducer = {
  constructorReducer,
  userOrderReducer,
  authReducer,
  ordersReducer,
}
