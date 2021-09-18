import { MarsRoverPhotosApi } from '@modules/mars-rover-photos';
import { useUserAuth } from '@modules/user-auth';
import { DisplayText, Layout } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const userAuth = useUserAuth();

  useEffect(() => {
    async function fetchData() {
      if (!userAuth?.user_id) return;

      try {
        const { data } = await MarsRoverPhotosApi.getAllRoverPhotos({
          rover_id: 'curiosity',
          user_id: userAuth.user_id,
          sol: 1000,
          page: 1,
        });

        console.log(data);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }

    fetchData();
  }, [userAuth?.user_id]);
  return (
    <Layout.Section>
      <DisplayText size="extraLarge">Shopify Challenge</DisplayText>
    </Layout.Section>
  );
};

export default Home;
