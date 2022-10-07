import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productStore',
  initialState: {
    productDataArray: <any>[],
  },
  reducers: {
    storeProductArray: (storeProductArray, action) => {
      storeProductArray.productDataArray.push(...action.payload.productDataArray);
    },
    replaceProductArray: (storeProductArray, action) => {
      storeProductArray.productDataArray = action.payload.productDataArray;
    },
  },
});

export const { storeProductArray, replaceProductArray } = productSlice.actions;

export default productSlice.reducer;
