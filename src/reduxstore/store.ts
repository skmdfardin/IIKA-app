import { combineReducers, configureStore } from '@reduxjs/toolkit';
import farmSlice from './farmSlice';
import userSlice from './userSlice';
import pondSlice from './pondSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
  farmStore: farmSlice,
  pondStore: pondSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
