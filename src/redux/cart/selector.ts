import { RootState } from "../store";

//тут типизирую глобальный стейт как RootState
export const selectCart = (state: RootState) => state.cart; //создал функцию которая повторяется в коде несколько раз, теперь в тех местах могу ее использовать.
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id); // ищу в корзине пиццу с таким же id