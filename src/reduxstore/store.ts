import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
