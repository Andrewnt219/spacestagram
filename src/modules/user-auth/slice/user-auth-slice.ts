import { Photos_Index_GetData, Photos_Index_GetQuery } from '@api/photos';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/app/store';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (params?: Photos_Index_GetQuery) => {
    const { data } = await axios.get<Photos_Index_GetData>('/api/photos', {
      params,
    });

    return data;
  }
);

export interface UserAuthState {
  userId: string | null;
}

const initialState: UserAuthState = {
  userId: null,
};

export const userAuthSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
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
