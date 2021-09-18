import { MarsRoverPhotosApi } from '@modules/mars-rover-photos';
import { DisplayText, Layout } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await MarsRoverPhotosApi.getAllRoverPhotos({
          sol: 1000,
          rover_id: 'opportunity',
        });

        console.log(data);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }

    fetchData();
  }, []);
  return (
    <Layout.Section>
      <DisplayText size="extraLarge">Shopify Challenge</DisplayText>
    </Layout.Section>
  );
};

export default Home;
