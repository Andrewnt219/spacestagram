import {
  Photo_ToggleLike_GetData,
  Photo_ToggleLike_GetQuery,
} from '@api/photo/toggleLike';
import { Photos_Index_GetData, Photos_Index_GetQuery } from '@api/photos';
import { HasMessage } from '@common';
import { MarsRoverPhoto } from '@mars-rover-photos-api';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { getErrorMessage } from '@utils/api-utils';
import axios from 'axios';
import { RootState } from 'src/app/store';

export const fetchMarsRoverPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (params?: Photos_Index_GetQuery) => {
    const { data } = await axios.get<Photos_Index_GetData>('/api/photos', {
      params,
    });

    return data;
  }
);

export const fetchHomeMarsRoverPhotos = createAsyncThunk(
  'photos/fetchHomePhotos',
  async (_, { dispatch, getState }) => {
    const { userAuth } = getState() as RootState;

    if (!userAuth.userId) return;

    dispatch(
      fetchMarsRoverPhotos({
        rover_name: 'curiosity',
        user_id: userAuth.userId,
        sol: 1000,
        page: 1,
      })
    );
  }
);

export const toggleLike = createAsyncThunk(
  'photos/toggleLike',
  async (photo_id: string, { getState, dispatch }) => {
    const { userAuth } = getState() as RootState;

    if (!userAuth.userId) return;

    const params: Photo_ToggleLike_GetQuery = {
      photo_id,
      user_id: userAuth.userId,
    };

    await axios.get<Photo_ToggleLike_GetData>('/api/photo/toggleLike', {
      params,
    });

    dispatch(fetchHomeMarsRoverPhotos());
  }
);

export interface PhotoState {
  likedPhotos: MarsRoverPhoto[];
  nonLikedPhotos: MarsRoverPhoto[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: HasMessage | null;
}

const initialState: PhotoState = {
  likedPhotos: [],
  nonLikedPhotos: [],
  status: 'idle',
  error: null,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarsRoverPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.likedPhotos = action.payload.data.favoritedPhotos;
        state.nonLikedPhotos = action.payload.data.nonFavoritedPhotos;
      })
      .addCase(toggleLike.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isPending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed';
        state.error = { message: getErrorMessage(action.error) };
      });
  },
});

export const selectPhotos = (state: RootState) => state.photos;

export const photosReducer = photosSlice.reducer;
