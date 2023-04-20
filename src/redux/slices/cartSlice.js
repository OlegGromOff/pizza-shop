import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  // создаю слайс
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        // если такая пицца уже есть в корзине, то увеличиваю КОЛИЧЕСТВО(count) пицц в корзине
        findItem.count++;
      } else {
        // если такой пиццы нет в корзине, то добавляю ее
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; // суммирую цену всех пицц * на количество(count)
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload); // ищу в корзине пиццу с таким же id
      if (findItem) {
        findItem.count--; // уменьшаю количество(count) пиццы в корзине
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart; //создал функцию которая повторяется в коде несколько раз, теперь в тех местах могу ее использовать.
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id); // ищу в корзине пиццу с таким же id

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions; //данные из reducers(actions)

export default cartSlice.reducer; //данные из initialState
