import { createSlice } from '@reduxjs/toolkit';
//это параметры первого рендера лолкек
const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};
// его закидываем в фильтер слайс

const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    setCatId(state, action) {
      // console.log('action setCategoryId________________________', action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      console.log('FILTERSLICE___CATID_____', state.categoryId);
    },
  },
});

export const { setCatId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
