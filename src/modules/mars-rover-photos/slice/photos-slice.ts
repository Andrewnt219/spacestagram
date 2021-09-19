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
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getErrorMessage } from '@utils/api-utils';
import axios from 'axios';
import { RootState } from 'src/app/store';

export const fetchMarsRoverPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (
    query: PhotoState['query'],
    { getState, rejectWithValue, dispatch }
  ) => {
    const { userAuth } = getState() as RootState;

    if (!userAuth.userId) return rejectWithValue('Missing user_id');

    const params: Photos_Index_GetQuery = {
      ...query,
      user_id: userAuth.userId,
    };
    const { data } = await axios.get<Photos_Index_GetData>('/api/photos', {
      params,
    });

    dispatch(photosSlice.actions.updateQuery(query));

    return data;
  }
);

export const invalidateMarsRoverPhotos = createAsyncThunk(
  'photos/invalidatePhotos',
  async (_, { dispatch, getState }) => {
    const { photos } = getState() as RootState;

    dispatch(fetchMarsRoverPhotos(photos.query));
  }
);

export const toggleLike = createAsyncThunk(
  'photos/toggleLike',
  async (photo_id: string, { getState, dispatch, rejectWithValue }) => {
    const { userAuth } = getState() as RootState;

    if (!userAuth.userId) return rejectWithValue('Missing user_id');

    const params: Photo_ToggleLike_GetQuery = {
      photo_id,
      user_id: userAuth.userId,
    };

    await axios.get<Photo_ToggleLike_GetData>('/api/photo/toggleLike', {
      params,
    });

    dispatch(invalidateMarsRoverPhotos());
  }
);

export interface PhotoState {
  likedPhotos: MarsRoverPhoto[];
  nonLikedPhotos: MarsRoverPhoto[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: HasMessage | null;
  query: Omit<Photos_Index_GetQuery, 'user_id'>;
}

const initialState: PhotoState = {
  likedPhotos: [],
  nonLikedPhotos: [],
  status: 'idle',
  error: null,
  query: {
    rover_name: 'curiosity',
    sol: 0,
    page: 1,
  },
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updateQuery: (
      state,
      action: PayloadAction<Partial<PhotoState['query']>>
    ) => {
      state.query = { ...state.query, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarsRoverPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.likedPhotos = action.payload.data.favoritedPhotos;
        state.nonLikedPhotos = action.payload.data.nonFavoritedPhotos;
      })
      .addMatcher(isFulfilled, (state) => {
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
