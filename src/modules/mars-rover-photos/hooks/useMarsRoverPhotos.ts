import { Photos_Index_GetQuery } from '@api/photos';
import { selectUserAuth } from '@modules/user-auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { fetchMarsRoverPhotos, selectPhotos } from '../slice';

/** Fetch photos with specified params. Also update the global store. */
export const useMarsRoverPhotos = (
  params: Omit<Photos_Index_GetQuery, 'user_id'>
) => {
  const userAuth = useSelector(selectUserAuth);

  const dispatch = useAppDispatch();
  const photosSelector = useSelector(selectPhotos);

  useEffect(() => {
    console.log('run');
    userAuth?.userId && dispatch(fetchMarsRoverPhotos(params));
  }, [dispatch, params, userAuth?.userId]);

  return photosSelector;
};
