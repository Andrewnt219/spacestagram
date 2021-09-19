import {
  fetchMarsRoverPhotos,
  PhotoCard,
  selectPhotos,
} from '@modules/mars-rover-photos';
import { PhotoCardSkeleton } from '@modules/mars-rover-photos/components/PhotoCardSkeleton';
import { useUserAuth } from '@modules/user-auth';
import { Frame, Page } from '@shopify/polaris';
import { createEmptyArray } from '@utils/array-utils';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { ImageSizesProvider } from 'src/context';
import css from 'styled-jsx/css';

const Home: NextPage = () => {
  const userAuth = useUserAuth();

  const dispatch = useAppDispatch();
  const photosSelector = useSelector(selectPhotos);

  useEffect(() => {
    userAuth?.user_id &&
      dispatch(
        fetchMarsRoverPhotos({
          rover_name: 'curiosity',
          user_id: userAuth.user_id,
          sol: 1000,
          page: 1,
        })
      );
  }, [dispatch, userAuth?.user_id]);

  return (
    <Frame>
      <Page title="Spacestagram" subtitle="Mars Rover Photos">
        <ImageSizesProvider value="(min-width: 640px) 20vw, 100vw">
          <ul className="photo-list" aria-label="Photo from rovers">
            {photosSelector.status === 'pending' &&
              createEmptyArray(4).map((_, index) => (
                <PhotoCardSkeleton key={index} />
              ))}

            {photosSelector.likedPhotos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard photo={photo} isLiked />
              </li>
            ))}

            {photosSelector.nonLikedPhotos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard photo={photo} />
              </li>
            ))}
          </ul>
        </ImageSizesProvider>

        <style jsx>{styles}</style>
      </Page>
    </Frame>
  );
};

const styles = css`
  .photo-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(40rem, 100%), 1fr));
    gap: 2rem;
    list-style: none;
    padding: 0;
  }
`;
export default Home;
