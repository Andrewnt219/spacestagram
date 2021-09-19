import { photosReducer } from '@modules/mars-rover-photos';
import { userAuthReducer } from '@modules/user-auth';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

/** Global Redux store */
const store = configureStore({
  reducer: {
    photos: photosReducer,
    userAuth: userAuthReducer,
  },
});

/** typed store state */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** typed dispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
