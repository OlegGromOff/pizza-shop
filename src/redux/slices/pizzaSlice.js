import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createAsyncThunk - для асинхронных запросов
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  // создаю асинхронный экшен потому что мы тут делаем запрос на сервер и отправляем в него параметры из стора
  "pizza/fetchPizzasStatus",
  async (params) => {
    // params - объект с параметрами запроса
    // pizza/fetchPizzasStatus   pizza - название слайса, fetchPizzasStatus - название экшена
    const { sortBy, order, category, search, currentPage } = params; // деструктуризация объекта params
    const { data } = await axios.get(
      // благодаря await axios.get стал синхронным и я могу получить данные с сервера и записать в переменную res, и ниже можно не использовать then. await - жду пока axios выполнит запрос и получит ответ от сервера и только потом выполняется код который идет следом(ниже) (т.к. axios.get - асинхронный запрос) Я превратил axios.get в синхронный код с помощью await
      // после знака? - параметры запроса и если их несколько то через &
      // page=1&limit=4 - показывать по 4 пиццы на странице и показывать первую страницу (пагинация)
      `https://64090850d16b1f3ed6c92dc6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
  // обработку ошибок лучше делай не тут, а в компоненте, где ты вызываешь этот экшен, а тут только возвращай данные
); // createAsyncThunk - для создания асинхронных экшенов

const initialState = {
  items: [],
  status: "loading", // loading, success, error
};

const pizzaSlice = createSlice({
  // создаю слайс
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // для асинхронных экшенов
    [fetchPizzas.pending]: (state) => {
      // [fetchPizzas.pending] == pizza/fetchPizzasStatus/pending
      state.status = "loading";
      state.items = []; // очищаю массив items
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions; //данные из reducers(actions)

export default pizzaSlice.reducer; //данные из initialState
