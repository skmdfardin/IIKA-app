import { createSlice } from '@reduxjs/toolkit';

const pondSlice = createSlice({
  name: 'pondStore',
  initialState: {
    pondDataArray: <any>[],
  },
  reducers: {
    storePondArray: (storePondArray, action) => {
      storePondArray.pondDataArray.push(...action.payload.pondDataArray);
    },
    replacePondArray: (storePondArray, action) => {
      storePondArray.pondDataArray = action.payload.pondDataArray;
    },
  },
});

export const { storePondArray, replacePondArray } = pondSlice.actions;

export default pondSlice.reducer;
