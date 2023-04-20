import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter, // add the reducer to the store (filter: filter)
    cart, // add the reducer to the store (cart: cart)
    pizza, // add the reducer to the store (pizza: pizza)
  },
});
