import { combineReducers, configureStore } from '@reduxjs/toolkit';
import farmSlice from './farmSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
  farmStore: farmSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
