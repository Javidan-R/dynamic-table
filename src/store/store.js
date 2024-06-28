import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './reducer';

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
