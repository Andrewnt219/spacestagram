import { Photos_Index_GetData, Photos_Index_GetQuery } from '@api/photos';
import { HasMessage } from '@common';
import { MarsRoverPhoto } from '@mars-rover-photos-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from '@utils/api-utils';
import axios from 'axios';

export const fetchMarsRoverPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (params?: Photos_Index_GetQuery) => {
    const { data } = await axios.get<Photos_Index_GetData>('/api/photos', {
      params,
    });

    return data;
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
      .addCase(fetchMarsRoverPhotos.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMarsRoverPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = { message: getErrorMessage(action.error) };
      })
      .addCase(fetchMarsRoverPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.likedPhotos = action.payload.data.favoritedPhotos;
        state.nonLikedPhotos = action.payload.data.nonFavoritedPhotos;
      });
  },
});

export const photosReducer = photosSlice.reducer;
