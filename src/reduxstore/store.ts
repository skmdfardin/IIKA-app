import { combineReducers, configureStore } from '@reduxjs/toolkit';
import iikaSlice from './iikaSlice';
import userSlice from './userSlice';
import productSlice from './productSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
  iikaStore: iikaSlice,
  productStore: productSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
