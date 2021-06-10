import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import {constructorReducer} from "../ducks/constructor";
import {orderReducer} from "../ducks/order";
import {authReducer} from "../ducks/auth";


export const history = createBrowserHistory()
// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(logger, thunk))
// );


export const store = configureStore({
    reducer: {
        constructorReducer, orderReducer, authReducer,
        router: connectRouter(history)
    },
    middleware: [
        thunk,
        routerMiddleware(history)
    ]
})
