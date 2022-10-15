import { createSlice } from '@reduxjs/toolkit';
//это параметры первого рендера лолкек
const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem(state, action) {
      //   const findItem = state.items.find((obj) => obj.id === action.payload.id);

      //   if (findItem) {
      //     findItem.count++;
      //   } else {
      //     state.items.push({
      //       ...action.payload,
      //       count: 1,
      //     });
      //   }
      //state.totalPrice = calcTotalPrice(state.items);
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;

      // i = [];
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

export const { addItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;