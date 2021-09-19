import {
  fetchMarsRoverPhotos,
  PhotoCard,
  selectPhotos,
} from '@modules/mars-rover-photos';
import { PhotoCardSkeleton } from '@modules/mars-rover-photos/components/PhotoCardSkeleton';
import { selectUserAuth } from '@modules/user-auth';
import { Page } from '@shopify/polaris';
import { createEmptyArray } from '@utils/array-utils';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { ImageSizesProvider } from 'src/context';
import css from 'styled-jsx/css';

const Home: NextPage = () => {
  const userAuth = useSelector(selectUserAuth);

  const dispatch = useAppDispatch();
  const photosSelector = useSelector(selectPhotos);

  useEffect(() => {
    userAuth?.userId &&
      dispatch(
        fetchMarsRoverPhotos({
          rover_name: 'curiosity',
          sol: 0,
          page: 1,
        })
      );
  }, [dispatch, userAuth?.userId]);

  return (
    <Page title="Spacestagram" subtitle="Mars Rover Photos">
      <MetaTags />

      <ImageSizesProvider value="(min-width: 1024px) 20vw, 100vw">
        <ul className="photo-list" aria-label="Photo from rovers">
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

          {photosSelector.status === 'pending' &&
            createEmptyArray(4).map((_, index) => (
              <PhotoCardSkeleton key={index} />
            ))}
        </ul>
      </ImageSizesProvider>

      <style jsx>{styles}</style>
    </Page>
  );
};

const MetaTags = () => {
  const title = 'Homepage | Spacestagram';
  const description = "Curating Mars rover's photos from the NASA API";
  const baseUrl = 'https://spacestagram-gamma.vercel.app';
  const thumbnail = `${baseUrl}/thumbnail.jpg`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="follow, index" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:site_name" content="Spacestagram" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@andrewnt219" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />
    </Head>
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
