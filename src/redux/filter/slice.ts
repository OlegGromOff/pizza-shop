import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: "популярности",
      sortProperty: SortPropertyEnum.RATING_DESC,
    },
  };
  
  const filterSlice = createSlice({
    // создаю слайс
    name: "filter",
    initialState,
    reducers: {
      // actions
      setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload; // action.payload - то что я передаю в action
      },
      setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload; // action.payload - то что я передаю в action
      },
      setSort(state, action: PayloadAction<Sort>) {
        state.sort = action.payload; // меняю sort на то что передал в action
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
        if(Object.keys(action.payload).length ){
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
        } else {
          state.currentPage = 1;
          state.categoryId = 0;
          state.sort = {
            name: "популярности",
            sortProperty: SortPropertyEnum.RATING_DESC,
          };
        }
      },
    },
  });

  export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
  } = filterSlice.actions; //данные из reducers
  
  export default filterSlice.reducer; //данные из initialState