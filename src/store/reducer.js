import { createSlice } from '@reduxjs/toolkit';
import data from '../data/example.json';
import { processTableData } from '../components/TableDataProcessor';

const initialState = processTableData(data);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {}
});

export default tableSlice.reducer;
