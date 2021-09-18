import { DisplayText, Layout } from '@shopify/polaris';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout.Section>
      <DisplayText size="extraLarge">Shopify Challenge</DisplayText>
    </Layout.Section>
  );
};

export default Home;
