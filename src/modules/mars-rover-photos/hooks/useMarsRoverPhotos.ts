import { Photos_Index_GetQuery } from '@api/photos';
import { selectUserAuth } from '@modules/user-auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { useErrorToast } from 'src/context';
import { fetchMarsRoverPhotos, selectPhotos } from '../slice';

/** Fetch photos with specified params. Also update the global store. */
export const useMarsRoverPhotos = (
  params: Omit<Photos_Index_GetQuery, 'user_id'>
) => {
  const userAuthSelector = useSelector(selectUserAuth);

  const dispatch = useAppDispatch();
  const photosSelector = useSelector(selectPhotos);

  const { show } = useErrorToast();

  useEffect(() => {
    userAuthSelector.userId && dispatch(fetchMarsRoverPhotos(params));
  }, [dispatch, params, userAuthSelector.userId]);

  useEffect(() => {
    photosSelector.error && show(photosSelector.error.message);
  }, [photosSelector.error, show]);

  return photosSelector;
};
