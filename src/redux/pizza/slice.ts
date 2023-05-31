import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";



const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading, success, error
};


const pizzaSlice = createSlice({
  // создаю слайс
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
    // для асинхронных экшенов
    extraReducers: (builder) => { // builder - это объект, в котором есть методы addCase, addMatcher, addDefaultCase
      builder.addCase(fetchPizzas.pending, (state, action) => { // pending - это статус, когда запрос еще не выполнен
        state.status = Status.LOADING;
        state.items = [];
      });
  
      builder.addCase(fetchPizzas.fulfilled, (state, action) => { // fulfilled - это статус, когда запрос выполнен
        state.items = action.payload;
        state.status = Status.SUCCESS;
      });
  
      builder.addCase(fetchPizzas.rejected, (state, action) => {  // rejected - это статус, когда запрос не выполнен
        state.status = Status.ERROR;
        state.items = [];
      });
    },
});

export const { setItems } = pizzaSlice.actions; //данные из reducers(actions)

export default pizzaSlice.reducer; //данные из initialState