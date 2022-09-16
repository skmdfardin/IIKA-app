import { combineReducers, configureStore } from '@reduxjs/toolkit';
import farmSlice from './farmSlice';
import userSlice from './userSlice';
import pondSlice from './pondSlice';
import cycleSlice from './cycleSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
  farmStore: farmSlice,
  pondStore: pondSlice,
  cycleStore: cycleSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
