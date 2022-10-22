import { createSlice } from '@reduxjs/toolkit';
//import { stat } from 'fs';
//это параметры первого рендера лолкек
const initialState = {
  totalPrice: JSON.parse(localStorage.getItem('cartPrice')) || 0,
  items: JSON.parse(localStorage.getItem('cart')) || [],

  i: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    jsonCheck(state, action) {
      state.items = JSON.parse(localStorage.getItem('cart')) || [];
      state.totalPrice += state.items.price;
      state.i++;
    },

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
      state.i++;
      console.log(state.i, 'STATE I 1');

      // i = [];
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.i--;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.i = 0;
    },
    minusItem(state, action) {
      state.items = state.items.find((obj) => obj === action.payload);
      //state.items[action.payload] = '';

      console.log(action.payload, ' ACTION PYLOAD ', state.i, ' state I');
      if (state.items[state.i] !== []) {
        console.log(state.items[state.i], 'ПУСТОЙ МАСС итемс');
      }
      //  state.items = [];

      //state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, minusItem, jsonCheck } = cartSlice.actions;
export default cartSlice.reducer;
