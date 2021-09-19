import { photosReducer } from '@modules/mars-rover-photos';
import { userAuthReducer } from '@modules/user-auth';
import { Action, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
const store = configureStore({
  reducer: {
    photos: photosReducer,
    userAuth: userAuthReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
