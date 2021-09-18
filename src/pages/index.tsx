import { useUserAuth } from '@modules/user-auth';
import { DisplayText, Layout } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const userAuth = useUserAuth();

  useEffect(() => {
    async function fetchData() {
      console.log(userAuth?.user_id);
      try {
        const { data } = await axios.patch(
          `/api/photo/increaseLike?photo_id=1&user_id=${userAuth?.user_id}`
        );

        console.log(data);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }

    userAuth?.user_id && fetchData();
  }, [userAuth?.user_id]);
  return (
    <Layout.Section>
      <DisplayText size="extraLarge">Shopify Challenge</DisplayText>
    </Layout.Section>
  );
};

export default Home;
