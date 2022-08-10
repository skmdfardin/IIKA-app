import { createSlice } from '@reduxjs/toolkit';

const farmSlice = createSlice({
  name: 'farmStore',
  initialState: {
    farmName: '',
    farmDescription: '',
    farmID: '',
    farmImages: [],
    certificateArray: [],
  },
  reducers: {
    storeFarmID: (storeFarmID, action) => {
      storeFarmID.farmID = action.payload.farmID;
    },
    storeFarmName: (storeFarmName, action) => {
      storeFarmName.farmName = action.payload.farmName;
    },
    storeFarmDescription: (storeFarmDescription, action) => {
      storeFarmDescription.farmDescription = action.payload.farmDescription;
    },
    storeFarmImages: (storeFarmImages, action) => {
      storeFarmImages.farmImages = action.payload.farmImages;
    },
    storeCertificateArray: (storeCertificateArray, action) => {
      storeCertificateArray.certificateArray = action.payload.certificateArray;
    },
  },
});

export const { storeFarmName, storeFarmDescription, storeFarmImages, storeCertificateArray } = farmSlice.actions;

export default farmSlice.reducer;
