import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsApi';
// import { productsApi } from './services/productsApi';
import { cartApi } from "order/cartApi";
console.log(cartApi);

const reduxStore = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore