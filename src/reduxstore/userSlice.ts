import { createSlice } from '@reduxjs/toolkit';

export type UserDetails = {
  email: string;
};

const userSlice = createSlice({
  name: 'exampleStore',
  initialState: {
    email: 'example@text.com',
  },
  reducers: {
    storeEmailId: (storeEmailId, action) => {
      storeEmailId.email = action.payload.email;
    },
  },
});

export const { storeEmailId } = userSlice.actions;

export default userSlice.reducer;
