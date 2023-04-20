import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  // создаю слайс
  name: "filter",
  initialState,
  reducers: {
    // actions
    setCategoryId(state, action) {
      state.categoryId = action.payload; // action.payload - то что я передаю в action
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload; // action.payload - то что я передаю в action
    },
    setSort(state, action) {
      state.sort = action.payload; // меняю sort на то что передал в action
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state) => state.filter.sort; //функция чтобы не дублировать код в других файлах
export const selectFilter = (state) => state.filter; //функция чтобы не дублировать код в других файлах

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions; //данные из reducers

export default filterSlice.reducer; //данные из initialState
