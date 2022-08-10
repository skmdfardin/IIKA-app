import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    userName: '',
    isVerified: false,
    isProfileComplete: false,
  },
  reducers: {
    storeEmailId: (storeEmailId, action) => {
      storeEmailId.email = action.payload.email;
    },
    storeFirstName: (storeFirstName, action) => {
      storeFirstName.firstName = action.payload.firstName;
    },
    storeLastName: (storeLastName, action) => {
      storeLastName.lastName = action.payload.lastName;
    },
    storeMobile: (storeMobile, action) => {
      storeMobile.mobile = action.payload.mobile;
    },
    storeUserName: (storeUserName, action) => {
      storeUserName.userName = action.payload.userName;
    },
    storeIsVerified: (storeIsVerified, action) => {
      storeIsVerified.isVerified = action.payload.isVerified;
    },
    storeIsProfileComplete: (storeIsProfileComplete, action) => {
      storeIsProfileComplete.isProfileComplete = action.payload.isProfileComplete;
    },
  },
});

export const {
  storeEmailId,
  storeFirstName,
  storeLastName,
  storeMobile,
  storeUserName,
  storeIsVerified,
  storeIsProfileComplete,
} = userSlice.actions;

export default userSlice.reducer;
