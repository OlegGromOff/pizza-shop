import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, fetchPizzasArgs } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    // создаю асинхронный экшен потому что мы тут делаем запрос на сервер и отправляем в него параметры из стора
    "pizza/fetchPizzasStatus",
    async (params: fetchPizzasArgs) => {
      // params - объект с параметрами запроса
      // pizza/fetchPizzasStatus   pizza - название слайса, fetchPizzasStatus - название экшена
      const { sortBy, order, category, search, currentPage } = params; // деструктуризация объекта params
      const { data } = await axios.get(
        // благодаря await axios.get стал синхронным и я могу получить данные с сервера и записать в переменную res, и ниже можно не использовать then. await - жду пока axios выполнит запрос и получит ответ от сервера и только потом выполняется код который идет следом(ниже) (т.к. axios.get - асинхронный запрос) Я превратил axios.get в синхронный код с помощью await
        // после знака? - параметры запроса и если их несколько то через &
        // page=1&limit=4 - показывать по 4 пиццы на странице и показывать первую страницу (пагинация)
        `https://64090850d16b1f3ed6c92dc6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      );
      return data as Pizza[]; // возвращаю данные с сервера и типизирую их как Pizza[] Типизация асинхроггошо экшена
    }
    // обработку ошибок лучше делай не тут, а в компоненте, где ты вызываешь этот экшен, а тут только возвращай данные
  ); // createAsyncThunk - для создания асинхронных экшенов
  