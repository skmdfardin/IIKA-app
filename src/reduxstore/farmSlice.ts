import { createSlice } from '@reduxjs/toolkit';

const farmSlice = createSlice({
  name: 'farmStore',
  initialState: {
    farmName: '',
    farmDescription: '',
    farmID: '',
    farmImages: [
      'http://103.127.146.20:9000/aqua/user_image/2022-08-09_094200.516549_rn_image_picker_lib_temp_5e4e10ce-593b-418e-b64a-e418c03a597.jpg',
    ],
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

export const { storeFarmID, storeFarmName, storeFarmDescription, storeFarmImages, storeCertificateArray } =
  farmSlice.actions;

export default farmSlice.reducer;
