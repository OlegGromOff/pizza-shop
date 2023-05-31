import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from "./pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter, // add the reducer to the store (filter: filter)
    cart, // add the reducer to the store (cart: cart)
    pizza, // add the reducer to the store (pizza: pizza)
  },
});

export type RootState = ReturnType<typeof store.getState>; // типизация для store. Получили тип всего store

type AppDispatch = typeof store.dispatch; // типизация для store. Получили тип всего store
export const useAppDispatch = () => useDispatch<AppDispatch>(); // типизация для store. Получили тип всего store

// useAppDispatch - это хук, который мы создали для типизации dispatch. Теперь мы можем использовать этот хук вместо useDispatch<AppDispatch>()