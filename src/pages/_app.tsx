import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { MainLayout } from '@ui/MainLayout/MainLayout';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'src/app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppProvider i18n={enTranslations}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppProvider>
    </Provider>
  );
}
export default MyApp;
