import { RootState } from "../store";

// типизировал как RootState 
export const selectSort = (state: RootState) => state.filter.sort; //функция чтобы не дублировать код в других файлах
export const selectFilter = (state: RootState) => state.filter; //функция чтобы не дублировать код в других файлах


