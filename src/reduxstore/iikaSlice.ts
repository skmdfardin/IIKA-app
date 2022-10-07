import { createSlice } from '@reduxjs/toolkit';

const iikaSlice = createSlice({
  name: 'iikaStore',
  initialState: {
    iikaName: '',
    iikaDescription: '',
    iikaID: '',
    iikaImages: [],
    certificateArray: [],
  },
  reducers: {
    storeIikaID: (storeIikaID, action) => {
      storeIikaID.iikaID = action.payload.iikaID;
    },
    storeIikaName: (storeIikaName, action) => {
      storeIikaName.iikaName = action.payload.iikaName;
    },
    storeIikaDescription: (storeIikaDescription, action) => {
      storeIikaDescription.iikaDescription = action.payload.iikaDescription;
    },
    storeIikaImages: (storeIikaImages, action) => {
      storeIikaImages.iikaImages = action.payload.iikaImages;
    },
    storeCertificateArray: (storeCertificateArray, action) => {
      storeCertificateArray.certificateArray = action.payload.certificateArray;
    },
  },
});

export const { storeIikaID, storeIikaName, storeIikaDescription, storeIikaImages, storeCertificateArray } =
  iikaSlice.actions;

export default iikaSlice.reducer;
