import { Photos_Index_GetQuery } from '@api/photos';
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
import { RootState } from 'src/app/store';
import { PhotoApi, PhotosApi } from '../api';

/** Action to refetch the cached photos and fetching query */
export const fetchMarsRoverPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (
    query: PhotoState['query'],
    { getState, rejectWithValue, dispatch }
  ) => {
    const { userAuth } = getState() as RootState;
    if (!userAuth.userId) return rejectWithValue('Missing user_id');

    const data = await PhotosApi.fetchMarsRoverPhotos({
      ...query,
      user_id: userAuth.userId,
    });

    dispatch(photosSlice.actions.updateQuery(query));

    return data;
  }
);

/** Action to refetch photos with the current fetching query */
export const invalidateMarsRoverPhotos = createAsyncThunk(
  'photos/invalidatePhotos',
  async (_, { dispatch, getState }) => {
    const { photos } = getState() as RootState;

    dispatch(fetchMarsRoverPhotos(photos.query));
  }
);

/** Action to like a photo and updated category of cached photos */
export const likePhoto = createAsyncThunk(
  'photos/likePhoto',
  async (photo_id: string, { getState, rejectWithValue }) => {
    const { userAuth } = getState() as RootState;
    if (!userAuth.userId) return rejectWithValue('Missing user_id');

    await PhotoApi.likePhoto({ photo_id, user_id: userAuth.userId });

    return { photo_id };
  }
);

/** Action to unlike a photo and updated category of cached photos */
export const unlikePhoto = createAsyncThunk(
  'photos/unlkePhoto',
  async (photo_id: string, { getState, rejectWithValue }) => {
    const { userAuth } = getState() as RootState;
    if (!userAuth.userId) return rejectWithValue('Missing user_id');

    await PhotoApi.unlikePhoto({ photo_id, user_id: userAuth.userId });

    return { photo_id };
  }
);

export interface PhotoState {
  likedPhotos: MarsRoverPhoto[];
  nonLikedPhotos: MarsRoverPhoto[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: HasMessage | null;
  /** The query for fetching photos */
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
    /** Update the fetching query. This does NOT trigger refetch */
    updateQuery: (
      state,
      action: PayloadAction<Partial<PhotoState['query']>>
    ) => {
      state.query = { ...state.query, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      /** Update the cached photos  */
      .addCase(fetchMarsRoverPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.likedPhotos = action.payload.data.favoritedPhotos;
        state.nonLikedPhotos = action.payload.data.nonFavoritedPhotos;
      })
      /** Move the payload photo from `nonLikedPhotos` to `likedPhotos` */
      .addCase(likePhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const likedPhoto = state.nonLikedPhotos.find(
          (photo) => photo.id.toString() === action.payload.photo_id
        );
        if (!likedPhoto) return state;

        state.likedPhotos.push(likedPhoto);
        state.nonLikedPhotos = state.nonLikedPhotos.filter(
          (photo) => photo.id.toString() !== action.payload.photo_id
        );
      })
      /** Move the payload photo from `likedPhotos` to `nonLikedPhotos` */
      .addCase(unlikePhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const unlikedPhoto = state.likedPhotos.find(
          (photo) => photo.id.toString() === action.payload.photo_id
        );
        if (!unlikedPhoto) return state;

        state.nonLikedPhotos.push(unlikedPhoto);
        state.likedPhotos = state.likedPhotos.filter(
          (photo) => photo.id.toString() !== action.payload.photo_id
        );
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
        state.error = {
          message: getErrorMessage(action.payload ?? action.error),
        };
      });
  },
});

export const selectPhotos = (state: RootState) => state.photos;

export const photosReducer = photosSlice.reducer;
