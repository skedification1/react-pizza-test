import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortType, search, catrgoryId, currentPage } = params;
  const { data } = await axios.get(
    `https://63427c853f83935a7843d23c.mockapi.io/items?page=${currentPage}&limit=4${
      catrgoryId > 0 ? `&category=${catrgoryId}` : ''
    }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
      sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    }${search}`,
  );
  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Массив пицц в запросе пустой ');
  }

  return data;
});
//setIsLoading(true);
//const [isLoading, setIsLoading] = React.useState(true);
//это параметры первого рендера лолкек
const initialState = {
  items: [],
  //status: 'loading', // loading | success | error
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: {
    setItemsPizza(state, action) {
      state.items = action.payload;
      console.log(state.items, 'Диспатч пизза слайс');
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';

      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      console.log(state, ' Была ошибка');
      state.items = [];
    },
  },
});

export const { setItemsPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
