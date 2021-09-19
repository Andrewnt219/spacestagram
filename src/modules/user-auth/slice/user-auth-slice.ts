import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export interface UserAuthState {
  userId: string | null;
}

const initialState: UserAuthState = {
  userId: null,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    /** Log the user in and remember it. Null if fail to storing credentails */
    login: (state, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId;

      try {
        localStorage.setItem('userId', action.payload.userId);
      } catch (error) {
        state.userId = null;
        console.error('Fail to set user id');
      }
    },
  },
});

export const selectUserAuth = (state: RootState) => state.userAuth;

export const userAuthReducer = userAuthSlice.reducer;
