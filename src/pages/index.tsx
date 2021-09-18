import { MarsRoversApi } from '@modules/mars-rovers';
import { DisplayText, Layout } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await MarsRoversApi.getRoverById({
          rover_id: 'curiosity',
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
