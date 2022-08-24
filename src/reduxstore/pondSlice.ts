import { createSlice } from '@reduxjs/toolkit';

const pondSlice = createSlice({
  name: 'pondStore',
  initialState: {
    pondName: '',
    pondDescription: '',
    pondID: '',
    pondImages: [],
  },
  reducers: {
    storePondID: (storePondID, action) => {
      storePondID.pondID = action.payload.pondID;
    },
    storePondName: (storePondName, action) => {
      storePondName.pondName = action.payload.pondName;
    },
    storepondDescription: (storePondDescription, action) => {
      storePondDescription.pondDescription = action.payload.pondDescription;
    },
    storePondImages: (storePondImages, action) => {
      storePondImages.pondImages = action.payload.pondImages;
    },
  },
});

export const { storePondID, storePondName, storepondDescription, storePondImages } = pondSlice.actions;

export default pondSlice.reducer;
