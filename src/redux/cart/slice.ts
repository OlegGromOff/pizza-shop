import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  // создаю слайс
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) { // типизирую action. PayloadAction - это типизация для action в redux-toolkit
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        // если такая пицца уже есть в корзине, то увеличиваю КОЛИЧЕСТВО(count) пицц в корзине
        findItem.count++;
      } else {
        // если такой пиццы нет в корзине, то добавляю ее
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items); // пересчитываю общую сумму заказа
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload); // ищу в корзине пиццу с таким же id
      if (findItem) {
        findItem.count--; // уменьшаю количество(count) пиццы в корзине
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions; //данные из reducers(actions)

export default cartSlice.reducer; //данные из initialState
