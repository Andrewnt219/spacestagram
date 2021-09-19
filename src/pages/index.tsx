import { MarsRoverPhoto } from '@mars-rover-photos-api';
import { MarsRoverPhotosApi, PhotoCard } from '@modules/mars-rover-photos';
import { useUserAuth } from '@modules/user-auth';
import { Frame, Page } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ImageSizesProvider } from 'src/context';
import css from 'styled-jsx/css';

const Home: NextPage = () => {
  const userAuth = useUserAuth();
  const [photos, setPhotos] = useState<MarsRoverPhoto[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!userAuth?.user_id) return;

      try {
        const { data } = await MarsRoverPhotosApi.getAllRoverPhotos({
          rover_name: 'curiosity',
          user_id: userAuth.user_id,
          sol: 1000,
          page: 1,
        });

        setPhotos(data.data.nonFavoritedPhotos);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }

    fetchData();
  }, [userAuth?.user_id]);
  return (
    <Frame>
      <Page title="Spacestagram" subtitle="Mars Rover Photos">
        <ImageSizesProvider value="(min-width: 640px) 20vw, 100vw">
          <ul className="photo-list" aria-label="Photo from rovers">
            {photos.map((photo) => (
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
