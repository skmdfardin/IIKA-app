import { createSlice } from '@reduxjs/toolkit';

export type UserDetails = {
  email: string;
};

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    userName: '',
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
  },
});

export const { storeEmailId, storeFirstName, storeLastName, storeMobile, storeUserName } = userSlice.actions;

export default userSlice.reducer;
